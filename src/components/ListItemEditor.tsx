import React, { useState } from 'react';
import { View, Text, TextInput, Button } from "react-native";
import { Item } from '../types/Item';

interface ListItemEditorProps {
    item: Item;
    onClose: () => void;
    onEdit: (itemId: number, updatedData: Partial<Item>) => void;
}

const ListItemEditor: React.FC<ListItemEditorProps> = ({ item, onClose, onEdit }) => {
    const [name, setName] = useState<string>(item.name);

    const handleSave = () => {
        onEdit(item.id, { name });
    }

    return (
        <View>
            <Text>Editing {item.name}</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Item name"
            />
            <Button title="Save" onPress={handleSave} />
            {/*<Button title="Cancel" onPress={onClose} />*/}
        </View>
    )
}

export default ListItemEditor;