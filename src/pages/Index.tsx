import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Enterprise {
  id: number;
  name: string;
  type: 'production' | 'warehouse';
  position: { x: number; y: number };
  input: string[];
  output: string[];
  storage: { name: string; volume: number; unit: string }[];
  status: 'active' | 'idle' | 'warning';
}

interface Vehicle {
  id: number;
  name: string;
  type: string;
  cargo: string;
  volume: number;
  status: 'moving' | 'loading' | 'idle';
  route: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedPoint, setSelectedPoint] = useState<Enterprise | null>(null);

  const enterprises: Enterprise[] = [
    {
      id: 1,
      name: 'Завод "Алтай-Прогресс"',
      type: 'production',
      position: { x: 35, y: 45 },
      input: ['Сырье А', 'Материал Б'],
      output: ['Продукция X', 'Продукция Y'],
      storage: [
        { name: 'Продукция X', volume: 250, unit: 'т' },
        { name: 'Сырье А', volume: 120, unit: 'т' }
      ],
      status: 'active'
    },
    {
      id: 2,
      name: 'Склад "Барнаул-1"',
      type: 'warehouse',
      position: { x: 60, y: 35 },
      input: ['Продукция X', 'Продукция Y'],
      output: [],
      storage: [
        { name: 'Продукция X', volume: 500, unit: 'т' },
        { name: 'Продукция Y', volume: 320, unit: 'т' }
      ],
      status: 'active'
    },
    {
      id: 3,
      name: 'Комбинат "Алтай-Металл"',
      type: 'production',
      position: { x: 25, y: 60 },
      input: ['Металл', 'Компоненты'],
      output: ['Изделие Z'],
      storage: [
        { name: 'Изделие Z', volume: 180, unit: 'т' },
        { name: 'Металл', volume: 95, unit: 'т' }
      ],
      status: 'warning'
    },
    {
      id: 4,
      name: 'Склад "Бийск"',
      type: 'warehouse',
      position: { x: 75, y: 55 },
      input: ['Изделие Z'],
      output: [],
      storage: [
        { name: 'Изделие Z', volume: 420, unit: 'т' }
      ],
      status: 'active'
    }
  ];

  const vehicles: Vehicle[] = [
    {
      id: 1,
      name: 'КамАЗ А123ВС',
      type: 'Грузовой',
      cargo: 'Продукция X',
      volume: 20,
      status: 'moving',
      route: 'Завод → Склад Барнаул-1'
    },
    {
      id: 2,
      name: 'МАЗ В456ТК',
      type: 'Грузовой',
      cargo: 'Изделие Z',
      volume: 18,
      status: 'loading',
      route: 'Комбинат → Склад Бийск'
    },
    {
      id: 3,
      name: 'Volvo С789МР',
      type: 'Грузовой',
      cargo: '-',
      volume: 0,
      status: 'idle',
      route: 'Склад Барнаул-1'
    }
  ];

  const getStatusColor = (status: string) => {
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

  const getStatusText = (status: string) => {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="TruckIcon" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">LogiX Алтай</h1>
                <p className="text-sm text-muted-foreground">Система управления логистикой</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse" />
                Система активна
              </Badge>
              <Button variant="outline" size="sm">
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомления
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="map">
              <Icon name="Map" size={16} className="mr-2" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="enterprises">
              <Icon name="Factory" size={16} className="mr-2" />
              Предприятия
            </TabsTrigger>
            <TabsTrigger value="warehouses">
              <Icon name="Warehouse" size={16} className="mr-2" />
              Склады
            </TabsTrigger>
            <TabsTrigger value="transport">
              <Icon name="Truck" size={16} className="mr-2" />
              Транспорт
            </TabsTrigger>
            <TabsTrigger value="routes">
              <Icon name="Route" size={16} className="mr-2" />
              Маршруты
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Карта Алтайского края</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="ZoomIn" size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="ZoomOut" size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Maximize" size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative w-full h-[600px] bg-muted/30 rounded-lg overflow-hidden border border-border">
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-muted/20">
                      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm">
                        📍 Алтайский край
                      </div>

                      {enterprises.map((enterprise) => (
                        <div
                          key={enterprise.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
                          style={{ left: `${enterprise.position.x}%`, top: `${enterprise.position.y}%` }}
                          onClick={() => setSelectedPoint(enterprise)}
                        >
                          <div className="relative">
                            <div className={`w-4 h-4 rounded-full ${getStatusColor(enterprise.status)} animate-pulse`} />
                            <div className="absolute top-0 left-0 w-4 h-4 rounded-full border-2 border-primary/50 animate-ping" />
                          </div>
                          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-card/95 backdrop-blur-sm px-2 py-1 rounded text-xs border border-border">
                            {enterprise.name}
                          </div>
                        </div>
                      ))}

                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line
                          x1="35%"
                          y1="45%"
                          x2="60%"
                          y2="35%"
                          stroke="rgba(155, 135, 245, 0.4)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                        <line
                          x1="25%"
                          y1="60%"
                          x2="75%"
                          y2="55%"
                          stroke="rgba(155, 135, 245, 0.4)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      <span>Активен</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-muted" />
                      <span>Простой</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <span>Требует внимания</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                {selectedPoint ? (
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${selectedPoint.type === 'production' ? 'bg-primary/20' : 'bg-secondary/20'} flex items-center justify-center`}>
                          <Icon name={selectedPoint.type === 'production' ? 'Factory' : 'Warehouse'} size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedPoint.name}</h3>
                          <Badge className={getStatusColor(selectedPoint.status)}>
                            {getStatusText(selectedPoint.status)}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedPoint(null)}>
                        <Icon name="X" size={16} />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {selectedPoint.input.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Icon name="ArrowDown" size={14} className="text-muted-foreground" />
                            Потребляемая продукция
                          </h4>
                          <div className="space-y-1">
                            {selectedPoint.input.map((item, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedPoint.output.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Icon name="ArrowUp" size={14} className="text-muted-foreground" />
                            Выдаваемая продукция
                          </h4>
                          <div className="space-y-1">
                            {selectedPoint.output.map((item, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Icon name="Package" size={14} className="text-muted-foreground" />
                          Складские запасы
                        </h4>
                        <div className="space-y-2">
                          {selectedPoint.storage.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded">
                              <span className="text-sm">{item.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {item.volume} {item.unit}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                    <div className="text-center text-muted-foreground py-8">
                      <Icon name="MousePointerClick" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Выберите точку на карте для просмотра информации</p>
                    </div>
                  </Card>
                )}

                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                  <h3 className="font-semibold mb-4">Транспорт в движении</h3>
                  <div className="space-y-3">
                    {vehicles.filter(v => v.status === 'moving').map((vehicle) => (
                      <div key={vehicle.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                          <Icon name="Truck" size={20} className="text-secondary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm">{vehicle.name}</p>
                            <Badge className="bg-secondary text-xs">В пути</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {vehicle.cargo} • {vehicle.volume} т
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{vehicle.route}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="enterprises">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enterprises.filter(e => e.type === 'production').map((enterprise) => (
                <Card key={enterprise.id} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Icon name="Factory" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{enterprise.name}</h3>
                        <Badge className={getStatusColor(enterprise.status)}>
                          {getStatusText(enterprise.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Потребляет</p>
                      <div className="flex flex-wrap gap-1">
                        {enterprise.input.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Производит</p>
                      <div className="flex flex-wrap gap-1">
                        {enterprise.output.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Склад</p>
                      {enterprise.storage.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm mb-1">
                          <span>{item.name}</span>
                          <span className="text-primary">{item.volume} {item.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="warehouses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enterprises.filter(e => e.type === 'warehouse').map((warehouse) => (
                <Card key={warehouse.id} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-secondary/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <Icon name="Warehouse" size={24} className="text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{warehouse.name}</h3>
                        <Badge className={getStatusColor(warehouse.status)}>
                          {getStatusText(warehouse.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Хранимая продукция</p>
                      {warehouse.storage.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-muted/50 px-3 py-2 rounded mb-2">
                          <span className="text-sm">{item.name}</span>
                          <Badge variant="secondary">{item.volume} {item.unit}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transport">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="p-6 bg-card/50 backdrop-blur-sm border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <Icon name="Truck" size={24} className="text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{vehicle.name}</h3>
                        <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {getStatusText(vehicle.status)}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Груз</span>
                      <span className="text-sm font-medium">{vehicle.cargo}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Объем</span>
                      <span className="text-sm font-medium">{vehicle.volume > 0 ? `${vehicle.volume} т` : '-'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Маршрут</span>
                      <span className="text-sm font-medium text-right max-w-[60%] truncate">{vehicle.route}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="routes">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h2 className="text-xl font-semibold mb-6">Активные маршруты</h2>
              <div className="space-y-4">
                {vehicles.filter(v => v.status === 'moving').map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Truck" size={24} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{vehicle.name}</h3>
                        <Badge className="bg-secondary">В пути</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Package" size={14} />
                        <span>{vehicle.cargo} • {vehicle.volume} т</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Route" size={16} className="text-primary" />
                      <span>{vehicle.route}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Icon name="Eye" size={14} className="mr-2" />
                      Отследить
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name="Factory" size={24} className="text-primary" />
                  </div>
                  <Badge variant="secondary">+12%</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">4</h3>
                <p className="text-sm text-muted-foreground">Всего предприятий</p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Icon name="Truck" size={24} className="text-secondary" />
                  </div>
                  <Badge variant="secondary">+5%</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">3</h3>
                <p className="text-sm text-muted-foreground">Транспортных единиц</p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Icon name="Package" size={24} className="text-secondary" />
                  </div>
                  <Badge variant="secondary">+8%</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">1,685</h3>
                <p className="text-sm text-muted-foreground">Тонн на складах</p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
                    <Icon name="AlertTriangle" size={24} className="text-destructive" />
                  </div>
                  <Badge variant="destructive">1</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">1</h3>
                <p className="text-sm text-muted-foreground">Требует внимания</p>
              </Card>
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h2 className="text-xl font-semibold mb-6">Эффективность маршрутов</h2>
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 82, 78, 90, 88, 75, 92].map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-muted/30 rounded-t-lg relative" style={{ height: `${value}%` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary to-secondary rounded-t-lg opacity-80" />
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">День {idx + 1}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h2 className="text-xl font-semibold mb-6">Настройки системы</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Параметры оптимизации</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Приоритет по расстоянию</p>
                        <p className="text-xs text-muted-foreground">Минимизация километража маршрутов</p>
                      </div>
                      <Badge variant="secondary">Включено</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Приоритет по времени</p>
                        <p className="text-xs text-muted-foreground">Оптимизация времени доставки</p>
                      </div>
                      <Badge variant="secondary">Включено</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Автоматическое построение маршрутов</p>
                        <p className="text-xs text-muted-foreground">AI-оптимизация логистики</p>
                      </div>
                      <Badge variant="secondary">Включено</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
