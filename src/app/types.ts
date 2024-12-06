export type ToDoItem = {
  title: string;
  id: number;
  completed: boolean;
};
export type FilterType = 'all' | 'active' | 'completed';


export type StatusType = 'loading' | 'completed' | 'error';