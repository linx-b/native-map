import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { G, Path } from "react-native-svg";
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';

import Demo from './Demo'

export default function Pan() {
    const handle = ({ nativeEvent }) => {
      console.log(nativeEvent.locationX, nativeEvent.locationY)
    }
    return (
      <View style = {{ width: '100%', height:'100%' }}>
          {/* <SvgPanZoom
            canvasHeight  = {3411.326}
            canvasWidth   = {3411.326}
            minScale      = {1}
            maxScale      = {3}
            initialZoom   = {1.2}
            onZoom        = {(zoom) => { console.log('onZoom:' + zoom) }}
            canvasStyle   = {{ backgroundColor: 'yellow' }}
            viewStyle     = {{ backgroundColor: 'green'  }}
          >
            <Demo></Demo>
          </SvgPanZooma> */}
      </View>
    );
}