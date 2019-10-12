module.exports = {
    makeTable: {
        table: 'make',
        fields: {
            id: 'id',
            name: 'name'
        }
    },
    typeTable: {
        table: 'type',
        fields: {
            id: 'id',
            name: 'name'
        }
    },
    modelTable: {
        table: 'model',
        fields: {
            id: 'id',
            name: 'name',
            make: 'make_id',
            type: 'type_id'
        }
    },
    vehicleTable: {
        table: 'vehicle',
        fields: {
            id: 'id',
            model: 'model_id',
            year: 'model_year'
        }
    }
};
