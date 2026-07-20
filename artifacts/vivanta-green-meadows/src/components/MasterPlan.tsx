import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Compass, FileText, Maximize2, Minimize2 } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type Plot = {
  id: string;
  type: '30x40' | '30x45' | 'commercial' | 'odd' | 'ca' | 'landbank';
  status: 'available' | 'booked';
  facing: 'East' | 'West' | 'North' | 'South';
  price: string;
  sqft: number;
};

// Generate 95 Plots + C.A + STRR Land Bank from brochure layout plan
const generatePlots = (): Plot[] => {
  const plots: Plot[] = [];

  const col1TopL = ['83', '84', '85'];
  const col1TopR = ['82', '81', '80'];
  const col1BotL = ['86', '87', '88', '89', '90', '91', '92', '93', '94', '95'];
  const col1BotR = ['79', '78', '77', '76', '75', '74', '73', '72', '71', '70'];

  const col2TopL = ['57', '58', '59'];
  const col2TopR = ['56', '55', '54'];
  const col2BotL = ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'];
  const col2BotR = ['53', '52', '51', '50', '49', '48', '47', '46', '45', '44'];

  const col3TopL = ['30', '31', '32'];
  const col3TopR = ['29', '28', '27'];
  const col3BotL = ['33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43'];
  const col3BotR = ['26', '25', '24', '23', '22', '21', '20', '19', '18', '17', '16'];

  const col4TopL = ['01', '02', '03'];
  const col4BotL = ['04', '05', '06', '07', '08', '09', '12'];
  const col4BotR = ['10', '11'];
  
  const commercialIds = ['13', '14', '15'];

  const getPlotType = (id: string): '30x40' | '30x45' | 'commercial' | 'odd' => {
    if (commercialIds.includes(id)) return 'commercial';
    const oddIds = ['01', '02', '03', '04', '10', '11', '12', '16', '27', '32', '43', '44', '69', '70', '83', '85', '95'];
    if (oddIds.includes(id)) return 'odd';
    
    const idNum = parseInt(id);
    if (idNum >= 16 && idNum <= 43) return '30x45';
    if (idNum >= 54 && idNum <= 59) return '30x45';
    return '30x40';
  };

  const getFacing = (id: string): 'East' | 'West' | 'North' | 'South' => {
    if (commercialIds.includes(id)) return 'South';
    const westIds = [...col1TopL, ...col1BotL, ...col2TopL, ...col2BotL, ...col3TopL, ...col3BotL, ...col4TopL, ...col4BotL];
    if (westIds.includes(id)) return 'West';
    return 'East';
  };

  const allIds = [
    ...col1TopL, ...col1TopR, ...col1BotL, ...col1BotR,
    ...col2TopL, ...col2TopR, ...col2BotL, ...col2BotR,
    ...col3TopL, ...col3TopR, ...col3BotL, ...col3BotR,
    ...col4TopL, ...col4BotL, ...col4BotR, ...commercialIds
  ];

  allIds.forEach(id => {
    const type = getPlotType(id);
    const facing = getFacing(id);
    const idVal = parseInt(id);
    const status = 'available';

    let sqft = 1200;
    let price = '₹ 45 L - 50 L';

    if (type === '30x45') {
      sqft = 1350;
      price = '₹ 55 L - 60 L';
    } else if (type === 'commercial') {
      sqft = 2000;
      price = 'Contact for Price';
    } else if (type === 'odd') {
      sqft = idVal % 2 === 0 ? 1150 : 1250;
      price = '₹ 48 L - 52 L';
    }

    plots.push({ id, type, status, facing, price, sqft });
  });

  plots.push({
    id: 'C.A',
    type: 'ca',
    status: 'booked',
    facing: 'East',
    price: 'Clubhouse/Civic Amenity',
    sqft: 6000
  });

  plots.push({
    id: 'STRR Land Bank',
    type: 'landbank',
    status: 'booked',
    facing: 'East',
    price: 'Land Bank Development',
    sqft: 8000
  });

  return plots;
};

const plots = generatePlots();

function ThreeDPlan({ plots, onSelectPlot }: { plots: Plot[]; onSelectPlot: (plot: Plot) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);

  // Store selection handler in a ref to avoid effect recreation on parent state change
  const onSelectPlotRef = useRef(onSelectPlot);
  useEffect(() => {
    onSelectPlotRef.current = onSelectPlot;
  }, [onSelectPlot]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 550;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfef3c7).lerp(new THREE.Color(0xffedd5), 0.5);
    scene.fog = new THREE.FogExp2(0xfcd34d, 0.012);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 48, 65);

    // Renderer - optimized with high performance settings and disabled shadows for zero lag
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false; // Disable shadow maps completely to prevent GPU rendering lag
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.4;
    controls.panSpeed = 0.4;
    controls.zoomSpeed = 0.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 15;
    controls.maxDistance = 100;
    controls.target.set(0, 0, 0);

    // Golden Sunset Lights
    const ambientLight = new THREE.AmbientLight(0xc7d2fe, 0.65);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.6);
    sunLight.position.set(40, 25, -45);
    scene.add(sunLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(105, 85);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x5a7d52,
      roughness: 0.9,
      metalness: 0.02,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Swimming Pool next to C.A Clubhouse
    const poolGeo = new THREE.PlaneGeometry(3.5, 7.0);
    const poolMat = new THREE.MeshStandardMaterial({ color: 0x22d3ee, metalness: 0.8, roughness: 0.1 });
    const pool = new THREE.Mesh(poolGeo, poolMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(20.5, 0.02, -14);
    scene.add(pool);

    // Left Winding Park Path Stepping Stones
    for (let zVal = -25; zVal <= 25; zVal += 1.8) {
      const stoneGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.03, 8);
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.95 });
      const stone = new THREE.Mesh(stoneGeo, stoneMat);
      const xVal = -36 + Math.sin(zVal * 0.14) * 1.6;
      stone.position.set(xVal, 0.015, zVal);
      scene.add(stone);
    }

    // Circular Park plazas
    const plazasZ = [-18, 0, 18];
    plazasZ.forEach((pz) => {
      const px = -36 + Math.sin(pz * 0.14) * 1.6;
      const plazaGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.02, 16);
      const plazaMat = new THREE.MeshStandardMaterial({ color: 0xa8a29e, roughness: 0.9 });
      const plaza = new THREE.Mesh(plazaGeo, plazaMat);
      plaza.position.set(px, 0.02, pz);
      scene.add(plaza);

      // Flower bushes around plazas
      const flowerColors = [0xef4444, 0xf43f5e, 0xf59e0b];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const bushGeo = new THREE.SphereGeometry(0.3, 6, 6);
        const bushMat = new THREE.MeshStandardMaterial({
          color: flowerColors[i % flowerColors.length],
          roughness: 0.9,
        });
        const bush = new THREE.Mesh(bushGeo, bushMat);
        bush.position.set(px + Math.cos(angle) * 1.6, 0.15, pz + Math.sin(angle) * 1.6);
        scene.add(bush);
      }
    });

    // Glowing Entrance Water Fountain (Bottom Left)
    const fountainGroup = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xa8a29e, roughness: 0.9 });
    const basinGeo = new THREE.CylinderGeometry(2.6, 2.8, 0.35, 24);
    const basin = new THREE.Mesh(basinGeo, stoneMat);
    basin.position.set(-9, 0.175, -25);
    fountainGroup.add(basin);

    const waterGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.02, 24);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.1,
      metalness: 0.8,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(-9, 0.3, -25);
    fountainGroup.add(water);

    const waterGlowLight = new THREE.PointLight(0x22d3ee, 1.8, 8);
    waterGlowLight.position.set(-9, 0.5, -25);
    scene.add(waterGlowLight);

    // Water jets
    const fountainJets: THREE.Mesh[] = [];
    const jetMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.7,
      transmission: 0.6,
      roughness: 0.1,
    });

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const jetGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 8);
      const jet = new THREE.Mesh(jetGeo, jetMat);
      jet.position.set(-9 + Math.cos(angle) * 1.1, 0.31 + 0.7, -25 + Math.sin(angle) * 1.1);
      jet.userData = { baseHeight: 1.4 };
      scene.add(jet);
      fountainJets.push(jet);
    }
    const centerJetGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.4, 8);
    const centerJet = new THREE.Mesh(centerJetGeo, jetMat);
    centerJet.position.set(-9, 0.31 + 1.2, -25);
    centerJet.userData = { baseHeight: 2.4 };
    scene.add(centerJet);
    fountainJets.push(centerJet);

    scene.add(fountainGroup);

    // Roads
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.75,
    });

    // 40 Ft Avenue Road (Horizontal) at z = -3
    const avenueRoadGeo = new THREE.PlaneGeometry(92, 6);
    const avenueRoad = new THREE.Mesh(avenueRoadGeo, roadMat);
    avenueRoad.rotation.x = -Math.PI / 2;
    avenueRoad.position.set(0, 0.01, -3);
    scene.add(avenueRoad);

    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const createStripe = (x: number, z: number, w: number, l: number) => {
      const stripeGeo = new THREE.PlaneGeometry(w, l);
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(x, 0.012, z);
      scene.add(stripe);
    };

    // Dashes along Avenue Road
    for (let xVal = -40; xVal <= 40; xVal += 10) {
      createStripe(xVal, -3, 2, 0.15);
    }

    // 4 Vertical Internal Roads (30 Ft) separating columns
    const createVerticalRoad = (x: number) => {
      const roadGeo = new THREE.PlaneGeometry(4.5, 78);
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.set(x, 0.01, 8);
      scene.add(road);

      // Dash lines
      for (let zVal = -30; zVal <= 40; zVal += 8) {
        if (Math.abs(zVal - (-3)) > 4) {
          createStripe(x, zVal, 0.12, 1.2);
        }
      }
    };
    createVerticalRoad(-32);
    createVerticalRoad(-18);
    createVerticalRoad(-2);
    createVerticalRoad(14);

    // Slanted Road on the right
    const slantedRoadGeo = new THREE.PlaneGeometry(6, 78);
    const slantedRoad = new THREE.Mesh(slantedRoadGeo, roadMat);
    slantedRoad.rotation.x = -Math.PI / 2;
    slantedRoad.rotation.z = -0.08;
    slantedRoad.position.set(31, 0.01, 8);
    scene.add(slantedRoad);

    // Entrance Archway Gate
    const archGroup = new THREE.Group();
    const entrancePillarGeo = new THREE.BoxGeometry(1.4, 5.2, 1.4);
    const entrancePillarMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.85 });
    const pillarL = new THREE.Mesh(entrancePillarGeo, entrancePillarMat);
    pillarL.position.set(-5, 2.6, -28);

    const pillarR = new THREE.Mesh(entrancePillarGeo, entrancePillarMat);
    pillarR.position.set(5, 2.6, -28);

    const entranceBeamGeo = new THREE.BoxGeometry(11.4, 0.7, 1.4);
    const entranceBeamMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.75 });
    const beam = new THREE.Mesh(entranceBeamGeo, entranceBeamMat);
    beam.position.set(0, 5.25, -28);
    archGroup.add(pillarL, pillarR, beam);
    scene.add(archGroup);

    // Landscaping Pine Trees
    const treesGroup = new THREE.Group();
    const createTree = (x: number, z: number) => {
      const tree = new THREE.Group();
      const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 1.2, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.6;
      tree.add(trunk);

      const foliageMat = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x166534 : 0x15803d,
        roughness: 0.85,
      });

      const cone1Geo = new THREE.ConeGeometry(0.75, 1.4, 8);
      const cone1 = new THREE.Mesh(cone1Geo, foliageMat);
      cone1.position.y = 1.6;
      tree.add(cone1);

      const cone2Geo = new THREE.ConeGeometry(0.55, 0.95, 8);
      const cone2 = new THREE.Mesh(cone2Geo, foliageMat);
      cone2.position.y = 2.15;
      tree.add(cone2);

      tree.position.set(x, 0, z);
      treesGroup.add(tree);
    };

    // Thick forest boundaries framing the estate rectangle
    for (let zVal = -36; zVal <= 36; zVal += 3.5) {
      createTree(-44, zVal);
      createTree(-46, zVal + 1.5);
      createTree(44, zVal);
      createTree(46, zVal + 1.5);
    }
    for (let xVal = -42; xVal <= 42; xVal += 4) {
      createTree(xVal, -36);
      createTree(xVal + 2, -38);
      createTree(xVal, 36);
      createTree(xVal + 2, 38);
    }

    // Inside-layout landscape trees
    const scatterTreePositions = [
      [-11, 2], [-12, -4], [-10, 5], [11, 2], [10, -4], [12, 5],
      [-22, 27], [-1, 27], [22, 27], [35, 27],
      [-4, -25], [4, -25], [16, -14], [28, -14], [28, -27]
    ];
    scatterTreePositions.forEach(([tx, tz]) => {
      createTree(tx, tz);
    });
    scene.add(treesGroup);

    // Streetlights with volumetric glowing light cones
    const createStreetlight = (x: number, z: number, rotY: number) => {
      const streetlight = new THREE.Group();

      const poleGeo = new THREE.CylinderGeometry(0.04, 0.07, 3.2, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 1.6;
      streetlight.add(pole);

      const armGeo = new THREE.BoxGeometry(0.8, 0.05, 0.05);
      const arm = new THREE.Mesh(armGeo, poleMat);
      arm.position.set(0.3, 3.2, 0);
      streetlight.add(arm);

      const bulbGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfff9c4 });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.set(0.7, 3.15, 0);
      streetlight.add(bulb);

      const coneGeo = new THREE.ConeGeometry(1.3, 3.0, 16, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });
      const lightCone = new THREE.Mesh(coneGeo, coneMat);
      lightCone.position.set(0.7, 1.6, 0);
      lightCone.rotation.x = Math.PI;
      streetlight.add(lightCone);

      streetlight.position.set(x, 0, z);
      streetlight.rotation.y = rotY;
      scene.add(streetlight);
    };

    // Place streetlights along vertical roads
    const roadXPositions = [-32, -18, -2, 14];
    roadXPositions.forEach(rx => {
      createStreetlight(rx - 2.3, -20, 0);
      createStreetlight(rx + 2.3, 0, Math.PI);
      createStreetlight(rx - 2.3, 20, 0);
    });

    // Plots creation
    const plotMeshes: THREE.Mesh[] = [];
    const plotsGroup = new THREE.Group();

    plots.forEach((plot) => {
      let width = 5.5;
      let length = 2.6;
      let height = 0.5;
      let x = 0;
      let z = 0;

      const col1TopL = ['83', '84', '85'];
      const col1TopR = ['82', '81', '80'];
      const col1BotL = ['86', '87', '88', '89', '90', '91', '92', '93', '94', '95'];
      const col1BotR = ['79', '78', '77', '76', '75', '74', '73', '72', '71', '70'];

      const col2TopL = ['57', '58', '59'];
      const col2TopR = ['56', '55', '54'];
      const col2BotL = ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'];
      const col2BotR = ['53', '52', '51', '50', '49', '48', '47', '46', '45', '44'];

      const col3TopL = ['30', '31', '32'];
      const col3TopR = ['29', '28', '27'];
      const col3BotL = ['33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43'];
      const col3BotR = ['26', '25', '24', '23', '22', '21', '20', '19', '18', '17', '16'];

      const col4TopL = ['01', '02', '03'];
      const col4BotL = ['04', '05', '06', '07', '08', '09', '12'];
      const col4BotR = ['10', '11'];
      const comm = ['13', '14', '15'];

      if (plot.id === 'C.A') {
        width = 6.5;
        length = 13.0;
        height = 0.5;
        x = 25;
        z = -14;
      } else if (plot.id === 'STRR Land Bank') {
        width = 6.5;
        length = 17.0;
        height = 0.4;
        x = 25;
        z = 11.5;
      } else if (col1TopL.includes(plot.id)) {
        x = -29;
        z = -20 + col1TopL.indexOf(plot.id) * 6;
      } else if (col1TopR.includes(plot.id)) {
        x = -23;
        z = -20 + col1TopR.indexOf(plot.id) * 6;
      } else if (col1BotL.includes(plot.id)) {
        x = -29;
        z = 4 + col1BotL.indexOf(plot.id) * 3;
      } else if (col1BotR.includes(plot.id)) {
        x = -23;
        z = 4 + col1BotR.indexOf(plot.id) * 3;
      } else if (col2TopL.includes(plot.id)) {
        x = -13;
        z = -20 + col2TopL.indexOf(plot.id) * 6;
        length = 2.8;
      } else if (col2TopR.includes(plot.id)) {
        x = -7;
        z = -20 + col2TopR.indexOf(plot.id) * 6;
        length = 2.8;
      } else if (col2BotL.includes(plot.id)) {
        x = -13;
        z = 4 + col2BotL.indexOf(plot.id) * 3;
      } else if (col2BotR.includes(plot.id)) {
        x = -7;
        z = 4 + col2BotR.indexOf(plot.id) * 3;
      } else if (col3TopL.includes(plot.id)) {
        x = 3;
        z = -20 + col3TopL.indexOf(plot.id) * 6;
        length = 2.8;
      } else if (col3TopR.includes(plot.id)) {
        x = 9;
        z = -20 + col3TopR.indexOf(plot.id) * 6;
        length = 2.8;
      } else if (col3BotL.includes(plot.id)) {
        x = 3;
        z = 4 + col3BotL.indexOf(plot.id) * 3;
      } else if (col3BotR.includes(plot.id)) {
        x = 9;
        z = 4 + col3BotR.indexOf(plot.id) * 3;
      } else if (col4TopL.includes(plot.id)) {
        x = 19;
        z = -20 + col4TopL.indexOf(plot.id) * 6;
      } else if (col4BotL.includes(plot.id)) {
        x = 19;
        z = 4 + col4BotL.indexOf(plot.id) * 3;
      } else if (col4BotR.includes(plot.id)) {
        x = 25;
        z = 22 + col4BotR.indexOf(plot.id) * 3;
      } else if (comm.includes(plot.id)) {
        width = 11.5;
        length = 2.8;
        height = 1.2;
        x = 22;
        z = 28 + comm.indexOf(plot.id) * 3.5;
      }

      // Materials
      let material: THREE.Material;
      let outlineColor = 0xffffff;

      if (plot.status === 'booked') {
        if (plot.type === 'ca') {
          material = new THREE.MeshPhysicalMaterial({
            color: 0xbae6fd,
            roughness: 0.1,
            metalness: 0.3,
            transparent: true,
            opacity: 0.8,
            transmission: 0.5,
          });
          outlineColor = 0x0284c7;
        } else if (plot.type === 'landbank') {
          material = new THREE.MeshStandardMaterial({
            color: 0x86198f,
            roughness: 0.95,
          });
          outlineColor = 0xa21caf;
        } else {
          material = new THREE.MeshStandardMaterial({
            color: 0x4a5749,
            roughness: 0.85,
            metalness: 0.05,
          });
          outlineColor = 0x5a6959;
        }
      } else {
        switch (plot.type) {
          case '30x40':
            material = new THREE.MeshPhysicalMaterial({
              color: 0xf0fdf4,
              roughness: 0.2,
              metalness: 0.1,
              transparent: true,
              opacity: 0.85,
              transmission: 0.4,
              thickness: 1.0,
            });
            outlineColor = 0x22c55e;
            break;
          case '30x45':
            material = new THREE.MeshPhysicalMaterial({
              color: 0xecfdf5,
              roughness: 0.2,
              metalness: 0.1,
              transparent: true,
              opacity: 0.85,
              transmission: 0.4,
              thickness: 1.0,
            });
            outlineColor = 0x10b981;
            break;
          case 'commercial':
            material = new THREE.MeshPhysicalMaterial({
              color: 0xfef9c3,
              roughness: 0.1,
              metalness: 0.3,
              transparent: true,
              opacity: 0.8,
              transmission: 0.5,
              thickness: 1.5,
            });
            outlineColor = 0xeab308;
            break;
          case 'odd':
            material = new THREE.MeshPhysicalMaterial({
              color: 0xf3f4f6,
              roughness: 0.3,
              metalness: 0.1,
              transparent: true,
              opacity: 0.85,
            });
            outlineColor = 0x64748b;
            break;
          default:
            material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        }
      }

      const geometry = new THREE.BoxGeometry(width, height, length);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, height / 2, z);

      const edges = new THREE.EdgesGeometry(geometry);
      const lineMat = new THREE.LineBasicMaterial({ color: outlineColor, linewidth: 2 });
      const line = new THREE.LineSegments(edges, lineMat);
      mesh.add(line);

      // Render C.A Clubhouse architecture
      if (plot.id === 'C.A') {
        const chBaseGeo = new THREE.BoxGeometry(5.5, 1.8, 10.0);
        const whiteConcreteMat = new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.8 });
        const chBase = new THREE.Mesh(chBaseGeo, whiteConcreteMat);
        chBase.position.set(0, 0.9 + height / 2, 0);
        mesh.add(chBase);

        const chTopGeo = new THREE.BoxGeometry(4.0, 1.4, 7.0);
        const greyConcreteMat = new THREE.MeshStandardMaterial({ color: 0x4b5563, roughness: 0.8 });
        const chTop = new THREE.Mesh(chTopGeo, greyConcreteMat);
        chTop.position.set(0, 2.5 + height / 2, 0);
        mesh.add(chTop);

        const roofGeo = new THREE.BoxGeometry(6.0, 0.15, 11.0);
        const blueRoofMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 });
        const roof = new THREE.Mesh(roofGeo, blueRoofMat);
        roof.position.set(0, 3.3 + height / 2, 0);
        mesh.add(roof);
      }

      // Corner gold pillars for commercial showrooms
      if (plot.type === 'commercial' && plot.status !== 'booked') {
        const pillarW = 0.25;
        const pillarGeo = new THREE.BoxGeometry(pillarW, height, pillarW);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.1 });
        const dx = width / 2 - pillarW / 2;
        const dz = length / 2 - pillarW / 2;
        const offsets = [[-dx, -dz], [dx, -dz], [-dx, dz], [dx, dz]];
        offsets.forEach(([ox, oz]) => {
          const cornerPillar = new THREE.Mesh(pillarGeo, pillarMat);
          cornerPillar.position.set(ox, 0, oz);
          mesh.add(cornerPillar);
        });
      }

      const idVal = parseInt(plot.id) || 99;

      mesh.userData = {
        plot,
        baseHeight: height,
        defaultY: height / 2,
        currentY: height / 2,
        targetY: height / 2,
        scaleY: 0.001,
        targetScaleY: 1.0,
        animStart: Date.now() + (plot.type === 'commercial' ? 0 : plot.type === 'odd' ? 100 : idVal * 15)
      };

      mesh.scale.y = 0.001;

      plotMeshes.push(mesh);
      plotsGroup.add(mesh);
    });
    scene.add(plotsGroup);

    // Raycaster flag optimization
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-9999, -9999);
    let needsRaycast = false;

    let isUserInteracting = false;
    let lastUserInteractionTime = Date.now();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      needsRaycast = true;

      // Update tooltip position direct in DOM (bypasses React state and re-renders!)
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${event.clientX - rect.left + 15}px`;
        tooltipRef.current.style.top = `${event.clientY - rect.top + 15}px`;
      }
    };

    const handleMouseLeave = () => {
      pointer.set(-9999, -9999);
      hoveredMeshRef.current = null;
      if (tooltipRef.current) tooltipRef.current.style.display = 'none';
    };

    const handleMouseClick = () => {
      if (hoveredMeshRef.current && hoveredMeshRef.current.userData && hoveredMeshRef.current.userData.plot) {
        const plot = hoveredMeshRef.current.userData.plot as Plot;
        if (plot.status !== 'booked') {
          onSelectPlotRef.current(plot);
        }
      }
    };

    controls.addEventListener('start', () => {
      isUserInteracting = true;
    });
    controls.addEventListener('end', () => {
      lastUserInteractionTime = Date.now();
    });

    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);
    renderer.domElement.addEventListener('click', handleMouseClick);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = Date.now();

      // 1. Entrance Rising Animation (settle calculation instantly)
      plotMeshes.forEach((mesh) => {
        if (mesh.userData.scaleY < 0.99) {
          if (now > mesh.userData.animStart) {
            mesh.userData.scaleY = THREE.MathUtils.lerp(mesh.userData.scaleY, mesh.userData.targetScaleY, 0.08);
            mesh.scale.y = mesh.userData.scaleY;
          }
        } else if (mesh.scale.y !== 1.0) {
          mesh.scale.y = 1.0;
          mesh.userData.scaleY = 1.0;
        }
      });

      // 2. Optimized Raycast check (runs ONLY when mouse is moving)
      if (needsRaycast) {
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(plotMeshes, true);

        if (intersects.length > 0) {
          let hitObject = intersects[0].object;
          while (hitObject && (!hitObject.userData || !hitObject.userData.plot) && hitObject.parent) {
            hitObject = hitObject.parent;
          }
          if (hitObject && hitObject.userData && hitObject.userData.plot) {
            if (hoveredMeshRef.current !== hitObject) {
              hoveredMeshRef.current = hitObject as THREE.Mesh;
              const p = hitObject.userData.plot as Plot;
              
              // Direct vanilla DOM injection for zero-lag tooltip
              if (tooltipRef.current) {
                const titleEl = tooltipRef.current.querySelector('#tooltip-title');
                const typeEl = tooltipRef.current.querySelector('#tooltip-type');
                const areaEl = tooltipRef.current.querySelector('#tooltip-area');
                const facingEl = tooltipRef.current.querySelector('#tooltip-facing');
                const priceEl = tooltipRef.current.querySelector('#tooltip-price');
                const statusEl = tooltipRef.current.querySelector('#tooltip-status');

                if (titleEl) titleEl.textContent = `Plot ${p.id}`;
                if (typeEl) typeEl.textContent = p.type;
                if (areaEl) areaEl.textContent = `${p.sqft} Sq.ft`;
                if (facingEl) facingEl.textContent = p.facing;
                if (priceEl) priceEl.textContent = p.price;
                
                if (statusEl) {
                  if (p.status === 'booked') {
                    statusEl.textContent = 'Booked';
                    statusEl.className = 'text-red-400 font-bold uppercase text-[9px] pt-1 text-center';
                  } else {
                    statusEl.textContent = 'Click to Enquire';
                    statusEl.className = 'text-green-400 font-bold uppercase text-[9px] pt-1 text-center animate-pulse';
                  }
                }
                tooltipRef.current.style.display = 'block';
              }
            }
          } else {
            if (hoveredMeshRef.current !== null) {
              hoveredMeshRef.current = null;
              if (tooltipRef.current) tooltipRef.current.style.display = 'none';
            }
          }
        } else {
          if (hoveredMeshRef.current !== null) {
            hoveredMeshRef.current = null;
            if (tooltipRef.current) tooltipRef.current.style.display = 'none';
          }
        }
        needsRaycast = false;
      }

      // 3. Hover elevation & scaling animation
      plotMeshes.forEach((mesh) => {
        const isHovered = mesh === hoveredMeshRef.current && mesh.userData.plot.status !== 'booked';
        mesh.userData.targetY = isHovered ? mesh.userData.defaultY + 0.6 : mesh.userData.defaultY;

        const diffY = Math.abs(mesh.position.y - mesh.userData.targetY);
        const targetScaleXZ = isHovered ? 1.04 : 1.0;
        const diffScaleX = Math.abs(mesh.scale.x - targetScaleXZ);

        if (diffY > 0.005) {
          mesh.userData.currentY = THREE.MathUtils.lerp(mesh.userData.currentY, mesh.userData.targetY, 0.15);
          mesh.position.y = mesh.userData.currentY;
        } else if (mesh.position.y !== mesh.userData.targetY) {
          mesh.position.y = mesh.userData.targetY;
          mesh.userData.currentY = mesh.userData.targetY;
        }

        if (diffScaleX > 0.005) {
          const s = THREE.MathUtils.lerp(mesh.scale.x, targetScaleXZ, 0.15);
          mesh.scale.x = s;
          mesh.scale.z = s;
        } else if (mesh.scale.x !== targetScaleXZ) {
          mesh.scale.x = targetScaleXZ;
          mesh.scale.z = targetScaleXZ;
        }
      });

      // 4. Pulsate Fountain water jets
      fountainJets.forEach((jet) => {
        const h = jet.userData.baseHeight;
        const scaleFactor = 0.7 + Math.sin(now * 0.005 + h) * 0.3;
        jet.scale.y = scaleFactor;
        jet.position.y = 0.31 + (h * scaleFactor) / 2;
      });

      // 5. Idle Camera Rotation
      if (isUserInteracting) {
        controls.update();
      } else {
        const elapsedSinceInteraction = now - lastUserInteractionTime;
        if (elapsedSinceInteraction > 7000) {
          const angle = 0.0006;
          const x = camera.position.x;
          const z = camera.position.z;
          camera.position.x = x * Math.cos(angle) - z * Math.sin(angle);
          camera.position.z = x * Math.sin(angle) + z * Math.cos(angle);
          camera.lookAt(0, 0, 0);
        }
        controls.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      renderer.domElement.removeEventListener('click', handleMouseClick);

      controls.dispose();

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []); // Run effect exactly once on mount, completely stable!

  return (
    <div ref={containerRef} className="w-full h-full relative min-h-[550px] bg-[#f8fafc] cursor-grab active:cursor-grabbing">
      <div className="absolute top-4 left-4 bg-bentley-green-50/90 backdrop-blur-md p-3.5 border border-forest-900/10 rounded-sm shadow-md pointer-events-none text-[10px] text-forest-900 font-sans space-y-1.5 z-10">
        <div className="font-bold uppercase tracking-widest text-[9px] text-gold-500 mb-1">3D Controls</div>
        <div className="flex items-center gap-1.5"><span>🖱️</span> <span>Left Click + Drag: Rotate</span></div>
        <div className="flex items-center gap-1.5"><span>🖱️</span> <span>Right Click + Drag: Pan</span></div>
        <div className="flex items-center gap-1.5"><span>📜</span> <span>Scroll Wheel: Zoom</span></div>
        <div className="flex items-center gap-1.5"><span>💡</span> <span>Hover plots to preview</span></div>
      </div>

      {/* Vanilla DOM Tooltip - avoids React state reconciliation on mouse move */}
      <div
        ref={tooltipRef}
        className="absolute hidden bg-forest-900/95 text-white p-4 shadow-xl border border-gold-500/40 pointer-events-none z-10 rounded-sm text-xs font-sans space-y-1.5 backdrop-blur-sm"
        style={{ left: 0, top: 0 }}
      >
        <div id="tooltip-title" className="text-gold-500 font-bold uppercase tracking-widest text-[9px] mb-1"></div>
        <div className="flex justify-between gap-8 border-b border-forest-900/10 pb-1">
          <span className="text-white/60">Type:</span>
          <span id="tooltip-type" className="font-semibold uppercase"></span>
        </div>
        <div className="flex justify-between gap-8 border-b border-forest-900/10 pb-1">
          <span className="text-white/60">Area:</span>
          <span id="tooltip-area" className="font-semibold"></span>
        </div>
        <div className="flex justify-between gap-8 border-b border-forest-900/10 pb-1">
          <span className="text-white/60">Facing:</span>
          <span id="tooltip-facing" className="font-semibold"></span>
        </div>
        <div className="flex justify-between gap-8 pt-0.5">
          <span className="text-white/60">Price:</span>
          <span id="tooltip-price" className="font-bold text-gold-500"></span>
        </div>
        <div id="tooltip-status" className="text-center font-bold uppercase text-[9px] pt-1"></div>
      </div>
    </div>
  );
}

export default function MasterPlan() {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [viewMode, setViewMode] = useState<'Brochure' | '3D'>('Brochure');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      fullscreenContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const getPlotButton = (id: string, customClasses = '') => {
    const plot = plots.find(p => p.id === id);
    if (!plot) return null;
    const isBooked = plot.status === 'booked';
    
    let colorClass = '';
    if (isBooked) {
      if (plot.type === 'ca') colorClass = 'bg-sky-500/20 border-sky-500 text-sky-900';
      else if (plot.type === 'landbank') colorClass = 'bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-900';
      else colorClass = 'bg-forest-900/80 text-white cursor-not-allowed';
    } else {
      switch (plot.type) {
        case '30x40': colorClass = 'bg-bentley-50 text-forest-900 hover:bg-bentley-50/80 cursor-pointer'; break;
        case '30x45': colorClass = 'bg-[#a3d1a6] text-forest-900 hover:bg-[#a3d1a6]/80 cursor-pointer'; break;
        case 'commercial': colorClass = 'bg-blue-500/30 border-blue-500 text-forest-900 hover:bg-blue-500/40 cursor-pointer'; break;
        case 'odd': colorClass = 'bg-yellow-500/30 border-yellow-500 text-forest-900 hover:bg-yellow-500/40 cursor-pointer'; break;
      }
    }

    return (
      <button
        key={id}
        onClick={() => plot.status !== 'booked' && setSelectedPlot(plot)}
        className={`border border-stone-300 flex items-center justify-center font-bold text-xs p-1 select-none transition-all duration-250 ${colorClass} ${customClasses}`}
        style={{ minWidth: '40px', minHeight: '35px' }}
      >
        {isBooked && plot.type !== 'ca' && plot.type !== 'landbank' ? (
          <span className="text-[8px] transform -rotate-12">BOOKED</span>
        ) : (
          plot.id
        )}
      </button>
    );
  };

  return (
    <section id="master-plan" className="py-24 md:py-32 bg-gradient-to-b from-[#f7fbf6] via-[#f0f8ef] to-[#e8f5e4] relative border-t border-[#c3dcbe]/40">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gold-500"></div>
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-forest-700">Interactive Master Plan</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-forest-900 mb-6">
              Select Your Premium Plot
            </h2>
            <p className="text-forest-700/80 leading-relaxed text-sm md:text-base">
              Click on any plot in the interactive layout map to view its dimension specs, pricing, and facing orientation, and instantly check its availability.
            </p>
          </div>

        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#e2ece0] p-1.5 rounded-full border border-forest-900/10 shadow-sm flex flex-wrap gap-1 justify-center">
            <button
              onClick={() => setViewMode('Brochure')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'Brochure'
                  ? 'bg-forest-900 text-white shadow-md'
                  : 'text-forest-700 hover:text-forest-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Layout Plan Brochure
            </button>
            <button
              onClick={() => setViewMode('3D')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 ${
                viewMode === '3D'
                  ? 'bg-forest-900 text-white shadow-md'
                  : 'text-forest-700 hover:text-forest-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Realistic 3D View
            </button>
          </div>
        </div>

        {/* Plan Area */}
        <div
          ref={fullscreenContainerRef}
          className={`relative bg-bentley-green-50/90 backdrop-blur-md rounded-xl shadow-luxury-lg border border-forest-900/10 overflow-hidden ${
            isFullscreen ? 'fixed inset-0 z-[9999] rounded-none border-0 shadow-none' : ''
          }`}
        >
          {viewMode === 'Brochure' ? (
            <div className="p-4 md:p-8 flex flex-col items-center justify-center bg-stone-50 border border-stone-200 shadow-inner rounded-sm">
              <div className="text-center mb-4">
                <span className="text-xs uppercase text-stone-500 font-sans tracking-widest block mb-1">STRR Approved Plan</span>
                <h4 className="font-serif text-lg text-forest-900">Residential Layout Plan to Great Living</h4>
              </div>
              <div className="max-w-4xl w-full border border-stone-200 overflow-hidden shadow-md bg-white p-2 rounded-sm">
                <img
                  src="/layout-plan.png"
                  alt="Residential Layout Plan"
                  className="w-full h-auto max-h-[700px] object-contain hover:scale-105 transition-transform duration-500 cursor-zoom-in rounded-sm"
                  onClick={() => window.open('/layout-plan.png', '_blank')}
                />
              </div>
              <p className="text-[10px] text-stone-500 mt-3">Click image to open high-resolution view in a new tab</p>
            </div>
          ) : (
            <div className={`relative ${isFullscreen ? 'w-full h-screen' : ''}`}>
              <ThreeDPlan plots={plots} onSelectPlot={setSelectedPlot} />
              {/* Fullscreen Toggle Button */}
              <button
                onClick={toggleFullscreen}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-forest-900/80 hover:bg-forest-900 text-white backdrop-blur-sm border border-forest-900/10 px-3 py-2 rounded-sm text-xs font-sans font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? (
                  <><Minimize2 className="w-3.5 h-3.5" /> Exit Fullscreen</>
                ) : (
                  <><Maximize2 className="w-3.5 h-3.5" /> Fullscreen</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-center sm:justify-start text-xs text-forest-700 uppercase tracking-widest">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-bentley-50 border"></div> 30x40 Plots</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#a3d1a6] border"></div> 30x45 Plots</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500/20 border border-blue-500"></div> Commercial</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500/20 border border-yellow-500"></div> Odd Plots</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-sky-500/20 border border-sky-500"></div> C.A (Clubhouse)</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-fuchsia-500/20 border border-fuchsia-500"></div> STRR Land Bank</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-forest-900 border"></div> Booked</div>
        </div>

      </div>

      {/* Plot Details Modal */}
      <AnimatePresence>
        {selectedPlot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/40 backdrop-blur-sm p-4"
            onClick={() => setSelectedPlot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bentley-green-50/90 backdrop-blur-md p-8 max-w-md w-full shadow-luxury-2xl relative border border-forest-900/10 rounded-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-forest-900"
                onClick={() => setSelectedPlot(null)}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">Plot Details</div>
              <h3 className="font-serif text-3xl text-forest-900 mb-6 border-b pb-4">Plot {selectedPlot.id}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">Dimensions</span>
                  <span className="font-medium text-forest-900 uppercase">{selectedPlot.type}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">Area (Sq.ft)</span>
                  <span className="font-medium text-forest-900">{selectedPlot.sqft}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">Facing</span>
                  <span className="font-medium text-forest-900">{selectedPlot.facing}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">Availability</span>
                  {selectedPlot.status === 'available' ? (
                    <span className="flex items-center gap-1 text-green-600 font-medium text-sm">
                      <CheckCircle2 className="w-4 h-4" /> Available
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-medium text-sm">
                      <AlertCircle className="w-4 h-4" /> Booked
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-500">Est. Price</span>
                  <span className="font-bold text-lg text-forest-900">{selectedPlot.price}</span>
                </div>
              </div>

              <a href="#contact" onClick={() => setSelectedPlot(null)} className="block w-full text-center bg-gold-500 text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-gold-600 transition-colors">
                Enquire About Plot {selectedPlot.id}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
