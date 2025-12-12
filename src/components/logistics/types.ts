export interface Enterprise {
  id: number;
  name: string;
  type: 'production' | 'warehouse';
  position: { x: number; y: number };
  input: string[];
  output: string[];
  storage: { name: string; volume: number; unit: string }[];
  status: 'active' | 'idle' | 'warning';
}

export interface Vehicle {
  id: number;
  name: string;
  type: string;
  cargo: string;
  volume: number;
  status: 'moving' | 'loading' | 'idle';
  route: string;
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
    case 'moving':
      return 'bg-secondary';
    case 'warning':
      return 'bg-destructive';
    case 'loading':
      return 'bg-primary';
    default:
      return 'bg-muted';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Активен';
    case 'idle':
      return 'Простой';
    case 'warning':
      return 'Требует внимания';
    case 'moving':
      return 'В пути';
    case 'loading':
      return 'Загрузка';
    default:
      return status;
  }
};
