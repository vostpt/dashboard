<template>
    <ContentWrapper>


        <div class="row">
            <div class="col-xl-8">
                <div class="card b">
                    <div class="card-body bb">
                        <div class="clearfix">
                            <div class="float-left">
                                Ocorrência em <strong>{{ occurrence.locality }}</strong>
                            </div>
                            <div class="float-right">
                                <div class="badge badge-info">
                                    {{ occurrence.status.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table">
                        <tbody>
                        <tr>
                            <td>
                                <strong>Tipo</strong>
                            </td>
                            <td>{{ occurrence.type.name }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Localidade</strong>
                            </td>
                            <td>{{ occurrence.locality }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Freguesia</strong>
                            </td>
                            <td>{{ occurrence.parish.name }}</td>
                        </tr>
                        <tr>
                            <td><strong>Operacionais Terrestres</strong></td>
                            <td>{{ occurrence.source.ground_operatives}}</td>
                        </tr>
                        <tr>
                            <td><strong>Veículos Terrestres</strong></td>
                            <td>{{ occurrence.source.ground_assets}}</td>
                        </tr>
                        <tr>
                            <td><strong>Veículos Aéreos</strong></td>
                            <td>{{ occurrence.source.aerial_assets}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-xl-4">

                <l-map style="width: 100%;height:50vh;" :zoom="zoom" :center="center">
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-marker :lat-lng="center"></l-marker>
                </l-map>
            </div>
        </div>
    </ContentWrapper>
</template>
<script>
    import Now from '@/components/Common/Now';
    import {LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet'
    import JsonApi from 'devour-client'


    export default {
        components: {
            Now,
            LMap,
            LTileLayer,
            LMarker,
            LIcon,
        },
        data() {
            return {
                occurrence: {},
                zoom: 16,
                center: [],
                bounds: null,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            }
        },
        mounted() {
            console.log("created");
            const id = this.$route.params.id;
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
                event: {
                    jsonApi: 'hasOne',
                    type: 'event'
                },
                source: {
                    jsonApi: 'hasOne',
                    type: 'prociv_occurrence'
                }

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

            jsonApi.define('prociv_occurrence', {
                aerial_assets: '',
                aerial_operatives: '',
                created_at: '',
                ground_assets: '',
                ground_operatives: '',
                remote_id: '',
                updated_at: '',
            });

            jsonApi.define('event');

            let data = async () => {
                let occurrences = await jsonApi.find('occurrence', id);
                //console.log(occurrences);
                return occurrences;
            }

            data().then(res => {
                this.occurrence = res.data;
                this.center = [this.occurrence.latitude, this.occurrence.longitude]
            });
        }
    }
</script>