<template>
    <div class="home">
        <h1>Latest Games</h1>
		<p v-if="games.length == 0">No games found</p>
		<v-row>
			<v-col md="4" v-for="game in games" :key="game.id">
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
                        <p class="body-1">Developer: {{ game.developer }}</p>
                        <p class="body-1">Publisher: {{ game.publisher }}</p>
                        <p class="body-1">Posted By: {{ game.author }}</p>
                        <p>{{ game.description }}</p>

                        <v-btn block color="primary">Learn More</v-btn>
                    </v-card-text>
				</v-card>
			</v-col>
		</v-row>
    </div>
</template>

<script>
import { auth, storage, gamesCollection, usersCollection } from '../firebase'
export default {
    name: 'Home',
    data() {
		return {
			games: []
		}
	},
	methods: {
		async getGames() {
			try {
                const querySnapshot = await gamesCollection.get()
                querySnapshot.forEach( async (doc) => {
                    let img = ''
                    if(doc.data().image) {
                        img = await storage.ref().child(doc.data().image).getDownloadURL()
					}
					let authorQuery = await usersCollection.doc(doc.data().userId).get()
                    this.games.push({
                        id: doc.id,
                        title: doc.data().title,
                        developer: doc.data().developer,
                        publisher: doc.data().publisher,
                        description: doc.data().description,
                        image: img,
						img: doc.data().image,
						author: authorQuery.data().name
                    })
                })
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
