export default function () {
  return {
    lot: {
      action: '',
      dialog: false,
      form: {}
    },
    table: {
      _columns: [
        {
          name: 'description',
          required: true,
          label: 'Descrição',
          align: 'left',
          field: row => row.description,
          sortable: true,
          action: true,
          style: 'width: 300px'
        },
        {
          name: 'pasture',
          required: true,
          label: 'Pasto',
          align: 'left',
          field: row => row.pasture,
          sortable: true,
          style: 'width: 300px'
        },
        {
          name: 'total_animal',
          required: true,
          label: 'Quantidade de Animal',
          align: 'right',
          field: row => row.total_animal,
          sortable: true,
          style: 'width: 200px'
        }
      ],
      _pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 15
      },
      lots: []
    }
  }
}
