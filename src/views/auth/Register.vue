<template>
    <v-row justify="center">
        <v-col md="4">
            <v-card elevation="2">
                <v-card-title>Register</v-card-title>
                <v-card-text>
                    <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >
                        <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            label="Name"
                            outlined
                            required
                        >
                        </v-text-field>

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
                            @click="register"
                            :loading="isLoading"
                        >
                            Register
                        </v-btn>
                    </v-form>

                    <p class="pt-2">Already have an account? <router-link :to="{ name: 'Login' }">Login Now</router-link></p>
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
            name: '',
            email: '',
            password: '',
            nameRules: [
                v => !!v || 'Name is required'
            ],
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
        register() {
            const valid = this.$refs.form.validate()
            if(valid) {
                this.isLoading = true
                this.$store.dispatch('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
            } 
        }
    }
}
</script>