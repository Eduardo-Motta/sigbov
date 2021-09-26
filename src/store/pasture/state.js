export default function () {
  return {
    pasture: {
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
          name: 'area',
          required: true,
          label: 'Área (ha)',
          align: 'right',
          field: row => row.area,
          sortable: true,
          style: 'width: 150px'
        },
        {
          name: 'total_lot',
          required: true,
          label: 'Quantidade de Lote',
          align: 'right',
          field: row => row.total_lot,
          sortable: true,
          style: 'width: 200px'
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
      pastures: []
    }
  }
}
