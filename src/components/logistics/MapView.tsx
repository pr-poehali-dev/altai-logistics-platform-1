import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Enterprise, Vehicle, getStatusColor, getStatusText } from './types';

interface MapViewProps {
  enterprises: Enterprise[];
  vehicles: Vehicle[];
  selectedPoint: Enterprise | null;
  setSelectedPoint: (point: Enterprise | null) => void;
}

const MapView = ({ enterprises, vehicles, selectedPoint, setSelectedPoint }: MapViewProps) => {
  return (
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
  );
};

export default MapView;
