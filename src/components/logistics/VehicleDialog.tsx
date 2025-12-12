import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Vehicle } from './types';

interface VehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (vehicle: Omit<Vehicle, 'id'>) => void;
  editingVehicle?: Vehicle | null;
}

const VehicleDialog = ({ open, onOpenChange, onSave, editingVehicle }: VehicleDialogProps) => {
  const [name, setName] = useState(editingVehicle?.name || '');
  const [type, setType] = useState(editingVehicle?.type || 'Грузовой');
  const [cargo, setCargo] = useState(editingVehicle?.cargo || '-');
  const [volume, setVolume] = useState(editingVehicle?.volume?.toString() || '0');
  const [status, setStatus] = useState<'moving' | 'loading' | 'idle'>(editingVehicle?.status || 'idle');
  const [route, setRoute] = useState(editingVehicle?.route || '');

  const handleSave = () => {
    onSave({
      name,
      type,
      cargo,
      volume: parseFloat(volume),
      status,
      route
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {editingVehicle ? 'Редактировать транспорт' : 'Добавить транспорт'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Номер/название</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="КамАЗ А123ВС"
              />
            </div>

            <div className="space-y-2">
              <Label>Тип</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Грузовой">Грузовой</SelectItem>
                  <SelectItem value="Фура">Фура</SelectItem>
                  <SelectItem value="Легковой">Легковой</SelectItem>
                  <SelectItem value="Специальный">Специальный</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Груз</Label>
              <Input
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Название груза"
              />
            </div>

            <div className="space-y-2">
              <Label>Объем (т)</Label>
              <Input
                type="number"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Статус</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="moving">🚚 В пути</SelectItem>
                <SelectItem value="loading">📦 Загрузка</SelectItem>
                <SelectItem value="idle">⏸️ Простой</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Маршрут</Label>
            <Input
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="Завод → Склад"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDialog;
