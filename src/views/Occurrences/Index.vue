<template>
    <ContentWrapper>
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="text-thin">Painel VOST Portugal</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <!-- START card-->
                <div class="card flex-row align-items-center align-items-stretch border-0">
                    <div class="col-4 d-flex align-items-center bg-primary-dark justify-content-center rounded-left">
                        <em class="icon-cloud-upload fa-3x"></em>
                    </div>
                    <div class="col-8 py-3 bg-primary rounded-right">
                        <div class="h2 mt-0">{{ occurrences.data.length }}</div>
                        <div class="text-uppercase">Ocorrências Ativas</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <!-- START card-->
                <div class="card flex-row align-items-center align-items-stretch border-0">
                    <div class="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
                        <em class="icon-globe fa-3x"></em>
                    </div>
                    <div class="col-8 py-3 bg-purple rounded-right">
                        <div class="h2 mt-0">{{ occurrences.data.length }}</div>
                        <div class="text-uppercase">Ocorrências Totais</div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-12"></div>
            <div class="col-xl-3 col-lg-6 col-md-12">
                <!-- START date widget-->
                <div class="card flex-row align-items-center align-items-stretch border-0">
                    <div class="col-4 d-flex align-items-center bg-green justify-content-center rounded-left">
                        <div class="text-center">
                            <!-- See formats: https://docs.angularjs.org/api/ng/filter/date-->
                            <Now class="text-sm" format="MMMM"></Now>
                            <br>
                            <Now class="h2 mt-0" format="D"></Now>
                        </div>
                    </div>
                    <div class="col-8 py-3 rounded-right">
                        <Now class="text-uppercase" format="dddd"></Now>
                        <br>
                        <Now class="h2 mt-0" format="H:mm"></Now>
                        <Now class="text-muted text-sm" format="a"></Now>
                    </div>
                </div>
                <!-- END date widget-->
            </div>
        </div>
    </ContentWrapper>
</template>
<script>
    import Now from '@/components/Common/Now';
    import { Formatter } from 'sarala-json-api-data-formatter';

    const formatter = new Formatter();

    export default {
        components: {
            Now
        },
        data() {
            return {
                occurrences: {},
            }
        },
        mounted() {
            console.log("created");
            fetch('https://api.vost.pt/v1/occurrences?page[size]=999&statuses[]=3&statuses[]=4&statuses[]=5&statuses[]=6&statuses[]=7', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            }).then(function (response) {
                return response.json();
            }).then(data => {
                let results = [];
                data = formatter.deserialize(data);
                this.occurrences = data;
            });
        }
    }
</script>