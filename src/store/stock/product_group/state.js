export default function () {
  return {
    productGroup: {
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
        }
      ],
      _pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 15
      },
      productsGroup: []
    }
  }
}
