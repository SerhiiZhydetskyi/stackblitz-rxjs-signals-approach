import {patchState, signalStore, withHooks, withMethods, withState} from "@ngrx/signals";
import {addEntity, removeEntity, setEntities, withEntities} from "@ngrx/signals/entities";
import {IBook} from "../interfaces/book.interface";
import {inject} from "@angular/core";
import {DataService} from "../services/data.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export const BooksStore = signalStore(
    // {providedIn: 'root'},
    withState({isLoading: false}),
    withEntities<IBook>(),
    withHooks({
        onInit(store, dataService = inject(DataService)) {
            patchState(store, {isLoading: true})
            dataService.getAllBooks().pipe(
                takeUntilDestroyed(),
                tap(books => patchState(store, setEntities(books))),
                tap(() => patchState(store, {isLoading: false})),
            ).subscribe();
        },
        onDestroy(store) {
            console.log('count on destroy', store);
        },
    }),
    withMethods((store, dataService = inject(DataService)) => ({
        add: rxMethod<IBook>(
            pipe(
                tap(() => patchState(store, {isLoading: true})),
                switchMap(book => {
                    return dataService.addBook(book).pipe(
                        tapResponse({
                            next: (book) => {
                                patchState(store, addEntity(book))
                            },
                            error: console.error,
                            finalize: () => patchState(store, {isLoading: false}),
                        })
                    )
                })
            )
        ),
        remove: rxMethod<IBook>(
            pipe(
                tap(() => patchState(store, {isLoading: true})),
                switchMap(book => {
                    return dataService.removeBook(book.id).pipe(
                        tapResponse({
                            next: (book) => {
                                patchState(store, removeEntity(book))
                            },
                            error: console.error,
                            finalize: () => patchState(store, {isLoading: false}),
                        })
                    )
                })
            )
        ),
    }))
);
