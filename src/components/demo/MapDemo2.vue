<template>
  <div class="login-wrap" style="width:100%;height: 100%;">
    <gmap-autocomplete
      @place_changed="setPlace">
    </gmap-autocomplete>
    <button @click="addMarker">Add</button>
    <gmap-map
      :center="center"
      :zoom="3"
      style="width:100%;  height: 100%;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
        :title="index"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>

  export default {
    data: function() {
      return {
        center: {lat: 45.508, lng: -73.587},
        markers: {
          86660604408391: {position: {lat: 22.5, lng: 113.9}},
          86660604408392: {position: {lat: -22.5, lng: 113.9}},
          86660604408393: {position: {lat: 45.508, lng: -73.587}}
        },
        places: [],
        currentPlace: null,
      };
    },
    mounted() {
      this.showLogin = true;
    },

    methods: {
      setPlace(place) {
        this.currentPlace = place;
      },
      addMarker() {
        // if (this.currentPlace) {
        //   const marker = {
        //     lat: this.currentPlace.geometry.location.lat(),
        //     lng: this.currentPlace.geometry.location.lng()
        //   };
        //   this.markers.push({position: marker});
        //   this.places.push(this.currentPlace);
        //   this.center = marker;
        //   this.currentPlace = null;
        // } else {
        //   this.markers.push({position: {lat: 22.5, lng: 113.9}});
        //   this.markers.push({position: {lat: 45.508, lng: -73.587}});
        // }
      },
    }
    // watch: {
    // }
  };
</script>
