// import {signalStoreFeature, withComputed} from "@ngrx/signals";
// import {computed, Signal} from "@angular/core";
//
//
//
// export function queryFilterStoreFeature<Entity>() {
//     return signalStoreFeature<T>(
//         withComputed(({ books, filter }: {books: Signal<T>}) => ({
//             booksCount: computed(() => books().length),
//             sortedBooks: computed(() => {
//                 const direction = filter.order() === 'asc' ? 1 : -1;
//
//                 return books().sort((a, b) =>
//                     direction * a.name.localeCompare(b.name)
//                 );
//             }),
//         })),
//     );
// }