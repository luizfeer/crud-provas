<template>
    <div class="alerts">
         <div v-for="(card, index) in alerts" :key="index">
            <v-alert
            class="mt-6"
            dismissible
            elevation="9"
            type="success"
            :color="card.color ? card.color : 'green'"
            >
                {{ card.msg }}
            </v-alert>
         </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['alerts']),
  },
};
</script>

<style  scoped>
.alerts{
    position: fixed;
    top:5rem;
    right: 3rem;
    z-index: 100;
}
</style>
