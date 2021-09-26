export default function () {
  return {
    animal: {
      action: '',
      dialog: false,
      form: {},
      weighings: {
        columns: [
          {
            name: 'date',
            required: true,
            label: 'Data',
            align: 'left',
            field: row => row.date,
            sortable: true,
            style: 'width: 150px'
          },
          {
            name: 'type',
            required: true,
            label: 'Tipo',
            align: 'left',
            field: row => row.type,
            sortable: true,
            style: 'width: 150px'
          },
          {
            name: 'weight',
            required: true,
            label: 'Peso (kg)',
            align: 'right',
            field: row => row.weight,
            sortable: true,
            style: 'width: 150px'
          }
        ],
        data: []
      }
    },
    table: {
      _columns: [
        {
          name: 'earring',
          required: true,
          label: 'Brinco',
          align: 'left',
          field: row => row.earring,
          sortable: true,
          action: true,
          style: 'width: 150px'
        },
        {
          name: 'rfid_code',
          required: true,
          label: 'Código RFID',
          align: 'left',
          field: row => row.rfid_code,
          sortable: true,
          style: 'width: 200px'
        },
        {
          name: 'lot',
          required: true,
          label: 'Lote',
          align: 'left',
          field: row => row.lot,
          sortable: true,
          style: 'width: 200px'
        },
        {
          name: 'pasture',
          required: true,
          label: 'Pasto',
          align: 'left',
          field: row => row.pasture,
          sortable: true,
          style: 'width: 200px'
        },
        {
          name: 'breed',
          required: true,
          label: 'Raça',
          align: 'left',
          field: row => row.breed,
          sortable: true,
          style: 'width: 200px'
        },
        {
          name: 'sex',
          required: true,
          label: 'Sexo',
          align: 'left',
          field: row => row.sex,
          sortable: true,
          style: 'width: 150px'
        },
        {
          name: 'category',
          required: true,
          label: 'Categoria',
          align: 'left',
          field: row => row.category,
          sortable: true,
          style: 'width: 150px'
        },
        {
          name: 'birth',
          required: true,
          label: 'Idade',
          align: 'left',
          field: row => row.birth,
          sortable: true,
          style: 'width: 150px'
        },
        {
          name: 'weight',
          required: true,
          label: 'Peso (kg)',
          align: 'right',
          field: row => row.weight,
          sortable: true,
          style: 'width: 150px'
        }
      ],
      _pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 15
      },
      animals: []
    }
  }
}
