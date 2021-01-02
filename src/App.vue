<template>
    <v-app>
        <v-app-bar
            app
            color="white"
			flat
        >
            <v-btn to="/" text>VueFirebase</v-btn>
			<v-spacer></v-spacer>
			<div v-if="!isAuthenticated">
				<v-btn :to="{ name: 'Login' }" text>Login</v-btn>
				<v-btn :to="{ name: 'Register' }" text>Register</v-btn>
			</div>
			<div v-else>
				<v-btn @click="logout" text>Logout</v-btn>
			</div>
        </v-app-bar>

        <v-main>
			<v-container>
				<router-view />
			</v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'App',

    data: () => ({
        //
	}),
	
	computed: {
		...mapState(['isAuthenticated'])
	},

	methods: {
		logout() {
			this.$store.dispatch('logout')
		}
	}
};
</script>
