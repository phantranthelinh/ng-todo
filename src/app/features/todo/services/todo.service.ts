import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  shareReplay,
  tap,
} from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterType, StatusType, ToDoItem } from '../../../types';

type State = {
  items: ToDoItem[];
  filterType: FilterType;
  status: StatusType;
};

const initialState: State = {
  items: [],
  filterType: 'all',
  status: 'loading',
};

@Injectable()
export class TodoService {
  private http = inject(HttpClient);
  private state$ = new BehaviorSubject<State>(initialState);
  readonly filterType$ = this.state$.pipe(
    map((state) => state.filterType),
    distinctUntilChanged()
  );

  readonly activeCount$ = this.state$.pipe(
    map((state) => state.items.filter((item) => !item.completed).length)
  );
  readonly filteredItems$ = this.state$.pipe(
    map(({ items, filterType }) => {
      const filterFunctions = {
        all: () => true,
        active: (item: ToDoItem) => !item.completed,
        completed: (item: ToDoItem) => item.completed,
      };
      const filterFunction = filterFunctions[filterType] || filterFunctions.all;
      return items.filter(filterFunction);
    }),
    shareReplay(5)
  );

  vm$ = combineLatest([
    this.state$,
    this.activeCount$,
    this.filteredItems$,
  ]).pipe(
    map(([{ status, items }, count, filteredItems]) => {
      return {
        status,
        items,
        count,
        filteredItems,
      };
    }),
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))

  );
  addItem(title: string) {
    const newItem: ToDoItem = {
      id: this.state$.value.items.length + 1,
      title,
      completed: false,
    };

    this.patchState({
      items: [...this.state$.value.items, newItem],
    });
  }
  setFilter(filterType: FilterType) {
    this.patchState({ filterType });
  }
  fetchData() {
    this.patchState({ status: 'loading' });
    this.http
      .get<ToDoItem[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .pipe(
        tap({
          error: () =>this.patchState({ status: 'error' }),
          complete: () => console.log('completed'),
        }),
        tap((items) => {
          this.patchState({ items, status: 'completed' });
        })
      )
      .subscribe();
  }

  private patchState(value: Partial<State>) {
    this.state$.next({
      ...this.state$.value,
      ...value,
    });
  }
  toggle(item: ToDoItem) {
    this.patchState({
      items: this.state$.value.items.map((x) =>
        x.id === item.id ? { ...x, completed: !x.completed } : x
      ),
    });
  }
  clear() {
    this.patchState({
      items: this.state$.value.items.filter((x) => !x.completed),
    });
  }
}
