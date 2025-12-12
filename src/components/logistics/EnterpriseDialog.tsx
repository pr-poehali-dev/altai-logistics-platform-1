import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Enterprise } from './types';

interface EnterpriseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (enterprise: Omit<Enterprise, 'id'>) => void;
  editingEnterprise?: Enterprise | null;
}

const EnterpriseDialog = ({ open, onOpenChange, onSave, editingEnterprise }: EnterpriseDialogProps) => {
  const [name, setName] = useState(editingEnterprise?.name || '');
  const [type, setType] = useState<'production' | 'warehouse'>(editingEnterprise?.type || 'production');
  const [status, setStatus] = useState<'active' | 'idle' | 'warning'>(editingEnterprise?.status || 'active');
  const [latitude, setLatitude] = useState(editingEnterprise?.position.x.toString() || '52.0');
  const [longitude, setLongitude] = useState(editingEnterprise?.position.y.toString() || '84.0');
  const [inputProducts, setInputProducts] = useState<string[]>(editingEnterprise?.input || []);
  const [outputProducts, setOutputProducts] = useState<string[]>(editingEnterprise?.output || []);
  const [storageItems, setStorageItems] = useState<{ name: string; volume: number; unit: string }[]>(
    editingEnterprise?.storage || []
  );

  const [newInput, setNewInput] = useState('');
  const [newOutput, setNewOutput] = useState('');
  const [newStorageName, setNewStorageName] = useState('');
  const [newStorageVolume, setNewStorageVolume] = useState('');
  const [newStorageUnit, setNewStorageUnit] = useState('т');

  const handleSave = () => {
    onSave({
      name,
      type,
      position: { x: parseFloat(latitude), y: parseFloat(longitude) },
      input: inputProducts,
      output: outputProducts,
      storage: storageItems,
      status
    });
    onOpenChange(false);
  };

  const addInputProduct = () => {
    if (newInput.trim()) {
      setInputProducts([...inputProducts, newInput.trim()]);
      setNewInput('');
    }
  };

  const addOutputProduct = () => {
    if (newOutput.trim()) {
      setOutputProducts([...outputProducts, newOutput.trim()]);
      setNewOutput('');
    }
  };

  const addStorageItem = () => {
    if (newStorageName.trim() && newStorageVolume) {
      setStorageItems([
        ...storageItems,
        { name: newStorageName.trim(), volume: parseFloat(newStorageVolume), unit: newStorageUnit }
      ]);
      setNewStorageName('');
      setNewStorageVolume('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingEnterprise ? 'Редактировать объект' : 'Добавить предприятие/склад'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Название</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Название предприятия/склада"
              />
            </div>

            <div className="space-y-2">
              <Label>Тип</Label>
              <Select value={type} onValueChange={(v) => setType(v as 'production' | 'warehouse')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">🏭 Предприятие</SelectItem>
                  <SelectItem value="warehouse">📦 Склад</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Широта</Label>
              <Input
                type="number"
                step="0.01"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="52.0"
              />
            </div>

            <div className="space-y-2">
              <Label>Долгота</Label>
              <Input
                type="number"
                step="0.01"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="84.0"
              />
            </div>

            <div className="space-y-2">
              <Label>Статус</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Активен</SelectItem>
                  <SelectItem value="idle">Простой</SelectItem>
                  <SelectItem value="warning">Требует внимания</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Потребляемая продукция</Label>
            <div className="flex gap-2">
              <Input
                value={newInput}
                onChange={(e) => setNewInput(e.target.value)}
                placeholder="Название продукции"
                onKeyDown={(e) => e.key === 'Enter' && addInputProduct()}
              />
              <Button type="button" onClick={addInputProduct} size="sm">
                <Icon name="Plus" size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {inputProducts.map((product, idx) => (
                <Badge key={idx} variant="outline" className="gap-1">
                  {product}
                  <button
                    onClick={() => setInputProducts(inputProducts.filter((_, i) => i !== idx))}
                    className="ml-1 hover:text-destructive"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {type === 'production' && (
            <div className="space-y-2">
              <Label>Выдаваемая продукция</Label>
              <div className="flex gap-2">
                <Input
                  value={newOutput}
                  onChange={(e) => setNewOutput(e.target.value)}
                  placeholder="Название продукции"
                  onKeyDown={(e) => e.key === 'Enter' && addOutputProduct()}
                />
                <Button type="button" onClick={addOutputProduct} size="sm">
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {outputProducts.map((product, idx) => (
                  <Badge key={idx} variant="secondary" className="gap-1">
                    {product}
                    <button
                      onClick={() => setOutputProducts(outputProducts.filter((_, i) => i !== idx))}
                      className="ml-1 hover:text-destructive"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Складские запасы</Label>
            <div className="grid grid-cols-12 gap-2">
              <Input
                className="col-span-5"
                value={newStorageName}
                onChange={(e) => setNewStorageName(e.target.value)}
                placeholder="Продукция"
              />
              <Input
                className="col-span-3"
                type="number"
                value={newStorageVolume}
                onChange={(e) => setNewStorageVolume(e.target.value)}
                placeholder="Объем"
              />
              <Select value={newStorageUnit} onValueChange={setNewStorageUnit}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="т">т</SelectItem>
                  <SelectItem value="кг">кг</SelectItem>
                  <SelectItem value="шт">шт</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={addStorageItem} size="sm" className="col-span-1">
                <Icon name="Plus" size={16} />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {storageItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded">
                  <span className="text-sm">
                    {item.name}: {item.volume} {item.unit}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStorageItems(storageItems.filter((_, i) => i !== idx))}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              ))}
            </div>
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

export default EnterpriseDialog;
