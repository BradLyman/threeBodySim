/*
 * tbg.js
 * Main program module for the Three Body Grav. Simulation.
 */

/*jslint        browser : true, continue : true,
  devel  : true, indent : 2,      maxerr : 50,
  newcap : true, nomen  : true, plusplus : true,
  regexp : true, sloppy : true,     vars : false,
  white  : true
*/
/*global $, tbg, THREE */

// Modlue /tbg/
var tbg = (function() {
  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------
  var
    configMap = {
      planetMaterial : null,
      worldSize      : 200
    },

    stateMap = {
      scene       : null,
      camera      : null,
      renderer    : null,
      planet1Mesh : null,
      planet2Mesh : null
    },

    render,
    initModule;
  // ------------------ END MODULE SCOPE VARIABLES ------------------


  // -------------------- BEGIN UTILITY METHODS ---------------------
  // --------------------- END UTILITY METHODS ----------------------


  // ---------------------- BEGIN DOM METHODS -----------------------
  // ----------------------- END DOM METHODS ------------------------


  // -------------------- BEGIN EVENT HANDLERS ----------------------
  // Begin Event handler /render/
  //
  render = function() {
    var
      planetPositions = tbg.planets.getPlanetPositions();

    window.requestAnimationFrame( render );

    stateMap.planet1Mesh.position.copy( planetPositions[0] );
    stateMap.planet2Mesh.position.copy( planetPositions[1] );
    stateMap.renderer.render( stateMap.scene, stateMap.camera );

    tbg.planets.simulationStep();
  };
  // End Event handler /render/
  // --------------------- END EVENT HANDLERS -----------------------


  // -------------------- BEGIN PUBLIC METHODS ----------------------
  // Begin Public method /initModule/
  initModule = function () {
    var
      aspect = window.innerHeight / window.innerWidth,
      size   = configMap.worldSize * aspect;

    tbg.planets.initModule();

    configMap.planetMaterial = new THREE.MeshBasicMaterial({ color : 0x0000dd } );
    stateMap.renderer        = new THREE.WebGLRenderer();
    stateMap.scene           = new THREE.Scene();
    stateMap.camera          = new THREE.OrthographicCamera(
      -configMap.worldSize, configMap.worldSize, size, -size, 1, -1
    );

    stateMap.camera.position.z = 1;
    stateMap.renderer.setSize( window.innerWidth, window.innerHeight );
    $('body').append( stateMap.renderer.domElement );

    stateMap.planet1Mesh = new THREE.Mesh(
      new THREE.CircleGeometry( 5, 10 ), configMap.planetMaterial
    );

    stateMap.planet2Mesh = new THREE.Mesh(
      new THREE.CircleGeometry( 5, 10 ), configMap.planetMaterial
    );

    stateMap.scene.add( stateMap.planet1Mesh );
    stateMap.scene.add( stateMap.planet2Mesh );
    render();
  };
  // End Public method /initModule/
  // --------------------- END PUBLIC METHODS -----------------------

  return { initModule : initModule };
}());