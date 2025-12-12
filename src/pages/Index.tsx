import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Header from '@/components/logistics/Header';
import TabsContentSection from '@/components/logistics/TabsContentSection';
import EnterpriseDialog from '@/components/logistics/EnterpriseDialog';
import VehicleDialog from '@/components/logistics/VehicleDialog';
import { Enterprise, Vehicle } from '@/components/logistics/types';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedPoint, setSelectedPoint] = useState<Enterprise | null>(null);
  const { toast } = useToast();

  const defaultEnterprises: Enterprise[] = [
    {
      id: 1,
      name: 'Завод "Алтай-Прогресс"',
      type: 'production',
      position: { x: 52.5, y: 83.5 },
      input: ['Сырье А', 'Материал Б'],
      output: ['Продукция X', 'Продукция Y'],
      storage: [
        { name: 'Продукция X', volume: 250, unit: 'м³' },
        { name: 'Сырье А', volume: 120, unit: 'м³' }
      ],
      status: 'active'
    },
    {
      id: 2,
      name: 'Склад "Барнаул-1"',
      type: 'warehouse',
      position: { x: 53.3, y: 83.7 },
      input: ['Продукция X', 'Продукция Y'],
      output: [],
      storage: [
        { name: 'Продукция X', volume: 500, unit: 'м³' },
        { name: 'Продукция Y', volume: 320, unit: 'м³' }
      ],
      status: 'active'
    },
    {
      id: 3,
      name: 'Комбинат "Алтай-Металл"',
      type: 'production',
      position: { x: 51.8, y: 84.2 },
      input: ['Металл', 'Компоненты'],
      output: ['Изделие Z'],
      storage: [
        { name: 'Изделие Z', volume: 180, unit: 'м³' },
        { name: 'Металл', volume: 95, unit: 'м³' }
      ],
      status: 'warning'
    },
    {
      id: 4,
      name: 'Склад "Бийск"',
      type: 'warehouse',
      position: { x: 52.5, y: 85.2 },
      input: ['Изделие Z'],
      output: [],
      storage: [
        { name: 'Изделие Z', volume: 420, unit: 'м³' }
      ],
      status: 'active'
    }
  ];

  const defaultVehicles: Vehicle[] = [
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

  const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
      return defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  const [enterprises, setEnterprises] = useState<Enterprise[]>(() => 
    loadFromStorage('logistics-enterprises', defaultEnterprises)
  );

  const [vehicles, setVehicles] = useState<Vehicle[]>(() =>
    loadFromStorage('logistics-vehicles', defaultVehicles)
  );

  useEffect(() => {
    localStorage.setItem('logistics-enterprises', JSON.stringify(enterprises));
  }, [enterprises]);

  useEffect(() => {
    localStorage.setItem('logistics-vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const [enterpriseDialogOpen, setEnterpriseDialogOpen] = useState(false);
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [editingEnterprise, setEditingEnterprise] = useState<Enterprise | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const handleSaveEnterprise = (enterprise: Omit<Enterprise, 'id'>) => {
    if (editingEnterprise) {
      setEnterprises(enterprises.map(e => 
        e.id === editingEnterprise.id ? { ...enterprise, id: editingEnterprise.id } : e
      ));
      toast({
        title: 'Обновлено',
        description: 'Данные объекта успешно обновлены'
      });
    } else {
      const newEnterprise = { ...enterprise, id: Date.now() };
      setEnterprises([...enterprises, newEnterprise]);
      toast({
        title: 'Добавлено',
        description: 'Новый объект успешно добавлен'
      });
    }
    setEditingEnterprise(null);
  };

  const handleSaveVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id ? { ...vehicle, id: editingVehicle.id } : v
      ));
      toast({
        title: 'Обновлено',
        description: 'Данные транспорта успешно обновлены'
      });
    } else {
      const newVehicle = { ...vehicle, id: Date.now() };
      setVehicles([...vehicles, newVehicle]);
      toast({
        title: 'Добавлено',
        description: 'Транспорт успешно добавлен'
      });
    }
    setEditingVehicle(null);
  };

  const handleDeleteEnterprise = (id: number) => {
    setEnterprises(enterprises.filter(e => e.id !== id));
    toast({
      title: 'Удалено',
      description: 'Объект удален из системы'
    });
  };

  const handleDeleteVehicle = (id: number) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast({
      title: 'Удалено',
      description: 'Транспорт удален из системы'
    });
  };

  const openEnterpriseDialog = () => {
    setEditingEnterprise(null);
    setEnterpriseDialogOpen(true);
  };

  const openVehicleDialog = () => {
    setEditingVehicle(null);
    setVehicleDialogOpen(true);
  };

  const handleResetData = () => {
    localStorage.removeItem('logistics-enterprises');
    localStorage.removeItem('logistics-vehicles');
    setEnterprises(defaultEnterprises);
    setVehicles(defaultVehicles);
    toast({
      title: 'Данные сброшены',
      description: 'Загружены начальные данные системы'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onResetData={handleResetData} />

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

          <TabsContentSection
            enterprises={enterprises}
            vehicles={vehicles}
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
            onAddEnterprise={openEnterpriseDialog}
            onEditEnterprise={(enterprise) => {
              setEditingEnterprise(enterprise);
              setEnterpriseDialogOpen(true);
            }}
            onDeleteEnterprise={handleDeleteEnterprise}
            onAddVehicle={openVehicleDialog}
            onEditVehicle={(vehicle) => {
              setEditingVehicle(vehicle);
              setVehicleDialogOpen(true);
            }}
            onDeleteVehicle={handleDeleteVehicle}
          />
        </Tabs>
      </main>

      <EnterpriseDialog
        open={enterpriseDialogOpen}
        onOpenChange={setEnterpriseDialogOpen}
        onSave={handleSaveEnterprise}
        editingEnterprise={editingEnterprise}
      />

      <VehicleDialog
        open={vehicleDialogOpen}
        onOpenChange={setVehicleDialogOpen}
        onSave={handleSaveVehicle}
        editingVehicle={editingVehicle}
      />
    </div>
  );
};

export default Index;