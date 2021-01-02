<template>
    <div class="dashboard">
        <h1>Hi, {{ userProfile.name }}</h1>
        <GameForm @game:added="addGame" />
        <v-row>
            <v-col md="4" v-for="(game, index) in games" :key="game.id">
                <v-card>
                    <v-img
                        v-if="game.image"
                        height="250"
                        :src="game.image"
                        lazy-src="https://via.placeholder.com/250"
                    >
                    </v-img>
                    <v-card-title>{{ game.title }}</v-card-title>
                    <v-card-text>
                        <p class="subtitle-1">Developer: {{ game.developer }}</p>
                        <p class="subtitle-1">Publisher: {{ game.publisher }}</p>
                        <p>{{ game.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <GameForm :game="game" :index="index" @game:updated="updateGame" />
                        <v-btn color="red" @click="deleteConfirm(game.id, game.title)" text>Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog
            v-model="deleteDialog"
            max-width="400"
        >
            <v-card>
                <v-card-title class="headline">
                    Delete Game?
                </v-card-title>
                <v-card-text>Are you sure you want to delete <b>{{ pTitle }}</b>?</v-card-text>
                <v-card-actions>
                    <v-btn text color="red" @click="deleteGame">Delete</v-btn>
                    <v-btn @click="deleteDialog = false" text color="secondary">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GameForm from '@/components/GameForm'
import { auth, storage, gamesCollection } from '../firebase'
export default {
    components: {
        GameForm
    },
    data() {
        return {
            games: [],
            pId: null,
            pTitle: null,
            deleteDialog: false
        }
    },
    computed: {
        ...mapState(['userProfile'])
    },
    methods: {
        async addGame(doc) {
            let img = ''
            if(doc.image) {
                img = await storage.ref().child(doc.image).getDownloadURL()
            }
            this.games.push({
                id: doc.id,
                title: doc.title,
                developer: doc.developer,
                publisher: doc.publisher,
                description: doc.description,
                image: img,
                img: doc.image
            })
        },

        async updateGame(doc) {
            let img = ''
            if(doc.image) {
                img = await storage.ref().child(doc.image).getDownloadURL()
            }
            this.games.splice(doc.index, 1, {
                id: doc.id,
                title: doc.title,
                developer: doc.developer,
                publisher: doc.publisher,
                description: doc.description,
                image: img,
                img: doc.image
            })
        },

        async getGames() {
            try {
                const querySnapshot = await gamesCollection.where('userId', '==', auth.currentUser.uid).get()
                querySnapshot.forEach( async (doc) => {
                    let img = ''
                    if(doc.data().image) {
                        img = await storage.ref().child(doc.data().image).getDownloadURL()
                    }
                    this.games.push({
                        id: doc.id,
                        title: doc.data().title,
                        developer: doc.data().developer,
                        publisher: doc.data().publisher,
                        description: doc.data().description,
                        image: img,
                        img: doc.data().image
                    })
                })
            } catch(e) {
                console.log(e)
            }
        },

        async deleteConfirm(id, title) {
            this.deleteDialog = true
            this.pId = id
            this.pTitle = title
        },

        async deleteGame() {
            try {
                await gamesCollection.doc(this.pId).delete()
                alert('Game deleted!')

                // remove game from array
                this.games.splice(this.games.findIndex(x => x.id == this.pId), 1)
                this.deleteDialog = false

                // reset
                this.pId = null
                this.pTitle = null
            } catch(e) {
                console.log(e)
            }
        }
    },
    async mounted() {
        await this.getGames()
    }
}
</script>