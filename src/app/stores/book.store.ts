import {patchState, signalStore, withHooks, withMethods} from "@ngrx/signals";
import {addEntity, removeEntity, setEntities, withEntities} from "@ngrx/signals/entities";
import {IBook} from "../interfaces/book.interface";
import {inject, signal} from "@angular/core";
import {DataService} from "../services/data.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export const BookStore = function () {
    let isLoading = signal(false);

    return signalStore(
        // {providedIn: 'root'},
        withEntities<IBook>(),
        withHooks({
            onInit(store, dataService = inject(DataService)) {
                isLoading.set(true);
                dataService.getBooks_ServerEmulator().pipe(
                    takeUntilDestroyed(),
                    tap(books => patchState(store, setEntities(books))),
                    tap(() => isLoading.set(false)),
                ).subscribe();
            },
            onDestroy(store) {
                console.log('count on destroy', store);
            },
        }),
        withMethods((store, dataService = inject(DataService)) => ({
            isLoading,
            add: rxMethod<IBook>(
                pipe(
                    tap(() => isLoading.set(true)),
                    switchMap(book => {
                        return dataService.addBook(book).pipe(
                            tapResponse({
                                next: (book) => {
                                    patchState(store, addEntity(book))
                                },
                                error: console.error,
                                finalize: () => isLoading.set(false),
                            })
                        )
                    })
                )
            ),
            remove: rxMethod<IBook>(
                pipe(
                    tap(() => isLoading.set(true)),
                    switchMap(book => {
                        return dataService.removeBook(book.id).pipe(
                            tapResponse({
                                next: (book) => {
                                    patchState(store, removeEntity(book))
                                },
                                error: console.error,
                                finalize: () => isLoading.set(false),
                            })
                        )
                    })
                )
            ),
        }))
    )
}();