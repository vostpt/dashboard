<template>
    <ContentWrapper>
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="text-thin">Lista de Ocorrências</h2>
            </div>
        </div>
        occurrences
        <div class="container-fluid">
            <table class="table table-condensed">
                <thead>
                <tr>
                    <td>Localidade</td>
                    <td>Estado</td>
                    <td>Criação</td>
                    <td>Atualização</td>
                    <td>Mais Informação</td>
                </tr>
                </thead>
                <tr v-for="occurrence in occurrences.data">
                    <td>{{ occurrence.locality }}</td>
                    <td>{{ occurrence.status.name }}</td>
                    <td>{{ occurrence.created_at }}</td>
                    <td>{{ occurrence.updated_at }}</td>
                    <td><a :href='/occurrence/ + occurrence.id'>Link </a></td>
                </tr>
            </table>
        </div>
    </ContentWrapper>
</template>
<script>
    import Vue from 'vue';
    import {ClientTable} from 'vue-tables-2';

    import JsonApi from 'devour-client'

    Vue.use(ClientTable);

    export default {
        components: {
            ClientTable
        },
        data() {
            return {
                occurrences: {},
            }
        },
        mounted() {

            const jsonApi = new JsonApi({
                apiUrl: 'https://bypasscors.herokuapp.com/api/?url=https://api.vost.pt/v1',
            });

            jsonApi.define('occurrence', {
                locality: '',
                latitude: '',
                longitude: '',
                created_at: '',
                ended_at: '',
                started_at: '',
                updated_at: '',
                parish: {
                    jsonApi: 'hasOne',
                    type: 'parish',
                },
                type: {
                    jsonApi: 'hasOne',
                    type: 'occurrence_type',
                },
                status: {
                    jsonApi: 'hasOne',
                    type: 'occurrence_status',
                },

            });

            jsonApi.define('parish', {
                code: '',
                created_at: "",
                name: "",
                updated_at: "",
            });

            jsonApi.define('occurrence_type', {
                code: '',
                created_at: "",
                name: "",
                updated_at: "",
            });

            jsonApi.define('occurrence_status', {
                code: '',
                created_at: "",
                name: "",
                updated_at: "",
            });

            let data = async () => {
                let occurrences = await jsonApi.findAll('occurrence', {sort: 'updated_at'});
                //console.log(occurrences);
                return occurrences;
            }

            data().then(res => {
                this.occurrences = res;
            });

            //let occurrence = new Occurrence();
            //const occurrences = Occurrence.get();

            //console.log(occurrences);
            /*let fetchAllOccurrences = async () => {
                occurrences = await occurrence.all();
            }

            console.log(fetchAllOccurrences());
            console.log(occurrences);*/
        }
    }
</script>