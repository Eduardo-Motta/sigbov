<template>
  <div class="row">
    <div class="col">
      <q-table
        :bordered="bordered"
        :class="tableClass"
        :columns="columns"
        :data="data"
        :dense="dense"
        :flat="flat"
        :pagination="pagination || initialPagination"
        :row-key="rowKey"
        :separator="separator"
      >
        <template v-slot:body-cell="props">
          <q-td v-if="!!props.col.action" :props="props">
            <span
              class="link"
              @click.stop="$emit('selected', props.row.id)"
            >
              {{ props.value }}
            </span>
          </q-td>

          <q-td v-else :props="props">
            {{ props.value }}
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentSigbovTable',

  data () {
    return {
      initialPagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 15
      }
    }
  },

  props: {
    bordered: {
      default: true,
      type: Boolean
    },
    columns: {
      required: true,
      type: Array
    },
    data: {
      required: true,
      type: Array
    },
    dense: {
      default: true,
      type: Boolean
    },
    flat: {
      default: true,
      type: Boolean
    },
    pagination: {
      type: Object
    },
    rowKey: {
      default: 'id',
      type: String
    },
    separator: {
      default: 'cell',
      type: String
    },
    tableClass: {
      default: 'my-sticky-header-table',
      type: String
    }
  }
}
</script>

<style lang="sass">
.q-table--dense
  .q-table thead tr,
  .q-table tbody tr,
  .q-table tbody td
    height: 37px

  .q-table__bottom
    min-height: 35px

.my-sticky-header-table
  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #eee

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
