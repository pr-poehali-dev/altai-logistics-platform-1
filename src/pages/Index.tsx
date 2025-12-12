import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Header from '@/components/logistics/Header';
import TabsContentSection from '@/components/logistics/TabsContentSection';
import { Enterprise, Vehicle } from '@/components/logistics/types';

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

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
          />
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
