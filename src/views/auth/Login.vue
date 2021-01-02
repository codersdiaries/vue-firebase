<template>
    <v-row justify="center">
        <v-col md="4">
            <v-card elevation="2">
                <v-card-title>Login</v-card-title>
                <v-card-text>
                    <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="Email"
                            outlined
                            required
                        >
                        </v-text-field>

                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            outlined
                            required
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                            :append-icon="show ? 'mdi-eye': 'mdi-eye-off'"
                        >
                        </v-text-field>

                        <v-btn
                            elevation="2"
                            color="primary"
                            @click="login"
                            :loading="isLoading"
                        >
                            Login
                        </v-btn>
                    </v-form>

                    <p class="pt-2">Create an account? <router-link :to="{ name: 'Register' }">Register</router-link></p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>


<script>
export default {
    data() {
        return {
            isLoading: false,
            show: false,
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be 8 characters or more'
            ]
        }
    },
    methods: {
        login() {
            const valid = this.$refs.form.validate()
            if(valid) {
                this.isLoading = true
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                })
            } 
        }
    }
}
</script>