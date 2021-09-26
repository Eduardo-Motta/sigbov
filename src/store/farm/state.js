export default function () {
  return {
    farm: {
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
          name: 'management_type',
          required: true,
          label: 'Tipo de Gestão',
          align: 'left',
          field: row => row.management_type,
          sortable: true,
          style: 'width: 300px'
        },
        {
          name: 'city',
          required: true,
          label: 'Cidade',
          align: 'left',
          field: row => row.city,
          sortable: true,
          style: 'width: 300px'
        },
        {
          name: 'state',
          required: true,
          label: 'Estado',
          align: 'left',
          field: row => row.state,
          sortable: true,
          style: 'width: 100px'
        },
        {
          name: 'total_pasture',
          required: true,
          label: 'Quantidade de Pasto',
          align: 'right',
          field: row => row.total_pasture,
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
      farms: []
    }
  }
}
