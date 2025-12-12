import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Enterprise, Vehicle, getStatusColor, getStatusText } from './types';
import MapView from './MapView';

interface TabsContentSectionProps {
  enterprises: Enterprise[];
  vehicles: Vehicle[];
  selectedPoint: Enterprise | null;
  setSelectedPoint: (point: Enterprise | null) => void;
  onAddEnterprise?: () => void;
  onEditEnterprise?: (enterprise: Enterprise) => void;
  onDeleteEnterprise?: (id: number) => void;
  onAddVehicle?: () => void;
  onEditVehicle?: (vehicle: Vehicle) => void;
  onDeleteVehicle?: (id: number) => void;
}

const TabsContentSection = ({ enterprises, vehicles, selectedPoint, setSelectedPoint, onAddEnterprise, onEditEnterprise, onDeleteEnterprise, onAddVehicle, onEditVehicle, onDeleteVehicle }: TabsContentSectionProps) => {
  console.log('Rendering TabsContentSection with enterprises:', enterprises.length, 'vehicles:', vehicles.length);
  
  return (
    <>
      <TabsContent value="map" className="space-y-4">
        <MapView 
          enterprises={enterprises} 
          vehicles={vehicles} 
          selectedPoint={selectedPoint} 
          setSelectedPoint={setSelectedPoint}
          onAddEnterprise={onAddEnterprise}
        />
      </TabsContent>

      <TabsContent value="enterprises">
        <div className="flex justify-end mb-4">
          <Button onClick={onAddEnterprise}>
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить предприятие
          </Button>
        </div>
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
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onEditEnterprise?.(enterprise)}>
                    <Icon name="Pencil" size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeleteEnterprise?.(enterprise.id)}>
                    <Icon name="Trash2" size={14} />
                  </Button>
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
        <div className="flex justify-end mb-4">
          <Button onClick={onAddEnterprise}>
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить склад
          </Button>
        </div>
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
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onEditEnterprise?.(warehouse)}>
                    <Icon name="Pencil" size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeleteEnterprise?.(warehouse.id)}>
                    <Icon name="Trash2" size={14} />
                  </Button>
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
        <div className="flex justify-end mb-4">
          <Button onClick={onAddVehicle}>
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить транспорт
          </Button>
        </div>
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
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(vehicle.status)}>
                    {getStatusText(vehicle.status)}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => onEditVehicle?.(vehicle)}>
                    <Icon name="Pencil" size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeleteVehicle?.(vehicle.id)}>
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
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
    </>
  );
};

export default TabsContentSection;