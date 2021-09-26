export default function () {
  return {
    warehouse: {
      action: '',
      dialog: false,
      form: {}
    },
    table: {
      _columns: [
        {
          name: 'name',
          required: true,
          label: 'Descrição',
          align: 'left',
          field: row => row.name,
          sortable: true,
          action: true,
          style: 'width: 300px'
        }
      ],
      _pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 15
      },
      warehouses: []
    }
  }
}
