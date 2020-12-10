import React, { Component } from 'react';
import ZoneList from '../../../../components/Lights/ZoneList';
import Spinner from '../../../../components/Spinner/Spinner';
import classes from './Floor.module.css';
import { Card, CardContent, CardMedia, Switch, Typography } from '@material-ui/core';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Floor extends Component {
  state = {
    activeCamera: null,
    isLightSelected: false,
    cameras: [],
    zones: [],
    loading: true
  }

  onPower = 70;
  controls = null;
  loader = new GLTFLoader();
  renderer = new THREE.WebGLRenderer();

  bulbMat = new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    emissiveIntensity: 10,
    color: 0xffffff
  });

  scene = new THREE.Scene();

  mapZoneToLights(zone){
    switch (zone.id) {
      case "5": //TVROOM
        return this.state.zones.filter((zone) => (
          zone.parent.name == "Light2FE" ||
          zone.parent.name == "Light2FB"
          ))
      case "1": //CAMERA
        return this.state.zones.filter((zone) => (
          zone.parent.name == "Light2FD"
          ))
      case "4": //BEDROOM
        return this.state.zones.filter((zone) => (
          zone.parent.name == "Light2FC"
          ))
      case "3": //INGRESSO
        return this.state.zones.filter((zone) => (
          zone.parent.name == "LightHallA"
          ))
      case "6": //KITCHEN
        return this.state.zones.filter((zone) => (
          zone.parent.name == "LightKitchenA" ||
          zone.parent.name == "LightKitchenB"
        ))
      case "7": //LOUNGE
        return this.state.zones.filter((zone) => (
          zone.parent.name == "LightOfficeA" ||
          zone.parent.name == "LightOfficeB"
        ))
      case "2": //SOGGIORNO
        return this.state.zones.filter((zone) => (
          zone.parent.name == "LightLivingB"
        ))
      default:
        return []
    }
  }

  switchCameraHandler = (camera_uuid) => {
    let activeCamera = this.state.cameras.filter((camera) => {
      return camera.uuid === camera_uuid
    })[0];

    if (activeCamera) {
      activeCamera.lookAt(this.scene.position);
      this.controls = new OrbitControls(activeCamera, this.renderer.domElement);
      this.controls.enableZoom = false;
      this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.autoRotate = true; // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.dampingFactor = 0.05;
      this.controls.screenSpacePanning = false;
      this.controls.minPolarAngle = 0;
      this.controls.maxPolarAngle = 1;
      this.controls.autoRotateSpeed = 20;
      
      activeCamera.position.x = 15; //*= factor;
      activeCamera.position.y = 25; //*= factor;
      activeCamera.position.z = 8; // *= factor;

      this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      this.setState({
        activeCamera: activeCamera
      });
    } else {
      console.log('nope');
    }
  }

  loadModel(model){
    this.loader.load(
      model, 
      (gltf) => {
        this.setState({loading: false});
        this.scene.add(gltf.scene);

        let defaultCamera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 80);
        defaultCamera.name = 'Default camera'
        this.setState({ cameras: [defaultCamera] });

        this.switchCameraHandler(defaultCamera.uuid);

        const zones = gltf.scene.children.flatMap((sceneElement) => {
          return sceneElement.children.filter((element) => {
              return element.type === "PointLight"
          }).map((light) => {
            light.power = 0;
            return light;
          });
        });

        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ReinhardToneMapping;

        this.scene.background = new THREE.Color(0x000000);

        this.renderer.setPixelRatio(window.devicePixelRatio);
        if (window.screen.width > 500) {
          this.renderer.setSize(window.screen.width / 3, 200);
        } else{
          this.renderer.setSize(350, 300);
        }

        this.setState({ zones: zones });

        let animate = () => {
          let activeCamera = this.state.activeCamera;
          requestAnimationFrame(animate);
          this.renderer.render(this.scene, activeCamera);
        };
        animate();
      },
      // called while loading is progressing
      function (xhr) {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.log(error)
        console.log('An error happened');
      }
    );
  }

  componentDidUpdate(){
    this.props.zones.map((zone) => {
      this.mapZoneToLights(zone).map((light) => this.updateLight(light, zone.on))
    })
  }

  componentDidMount() {
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    this.renderer.toneMappingExposure = Math.pow(1, 5.0); // to allow for very bright scenes.
    this.renderer.shadowMap.enabled = true;
    for (let light in this.state.zones) {
        light.castShadow = true;
        light.power = 1700;
        this.bulbMat.emissiveIntensity = light.intensity / Math.pow(0.02, 2.0); // convert from intensity to irradiance at bulb surface
    };
    import('../../../../../models/' + this.props.model).then((model) => {
        this.loadModel(model.default);
    })
  }

  updateLightParamsHandler = (color) => {
    if(this.state.activeLight){
      const activeLight = this.state.activeLight
      activeLight.color = color.rgb 
      activeLight.power = color.value * 100 / this.onPower;
      this.setState({activeLight: activeLight})
    }
  }

  updateLight = (light, on) => {
    if (on){
      light.power = this.onPower
    } else {
      light.power = 0
    }
  }

  render() {
    let barSelector = <Spinner />;
      
    if (!this.state.loading && this.props.zonesLoaded){
      barSelector = (
        <ZoneList
          name={this.props.name}
          fixtures={this.props.zones}
          onFixtureZoneUpdate={this.props.onFixtureZoneUpdate}
        />
      )
    }

    return (
      <Card className={classes.Floor}>
        <div>
          <Typography variant="h2" align="center" className={classes.heading}>
            <Switch
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={this.props.on}
              onChange={() => this.props.updateFloor(this.props.id)}
            />
            {this.props.name}
          </Typography>
        </div>
        <CardMedia className={classes.FloorPreview} ref={ref => (this.mount = ref)} />
        <CardContent>{barSelector}</CardContent>
      </Card>
    )
  }
}

export default Floor;
