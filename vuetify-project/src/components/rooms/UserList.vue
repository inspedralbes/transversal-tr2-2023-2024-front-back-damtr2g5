<template>
    <v-list class="scrollable-container" max-height="30em" density="compact" bg-color="rgb(255,255,255,0)">

        <v-list-item style="background-color: white; margin-bottom: 0.5em;" elevation="4" v-for="(item, i) in items"
            :key="i" :value="item" :base-color="teamColor" active-color="green">
            <template v-slot:prepend>
                <v-avatar>
                    <v-img :src="item.image"></v-img>
                </v-avatar>
            </template>

            <v-list-item-title v-text="item.email"></v-list-item-title>
        </v-list-item>
    </v-list>
</template>
<script>
export default {
    name: 'UserList',
    props: {
        teamColor: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    },
    setup() {
        return {
        };
    },
    data() {
        return {
            teamName: '',
        };
    },
    methods: {
    },
}
</script>
<style>

.scrollable-container::-webkit-scrollbar {
    display: none;
    scrollbar-color: transparent;
    
}
.scrollable-container:hover::-webkit-scrollbar {
    display: inherit;
    width: 0.5em;
}
/* Track */
.scrollable-container::-webkit-scrollbar-track {
  border-radius: 10px;
  
}
 
/* Handle */
.scrollable-container::-webkit-scrollbar-thumb {
  background: rgba(104, 104, 104, 0.697); 
  border-radius: 10px;
}

/* Handle on hover 
.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}*/
</style>