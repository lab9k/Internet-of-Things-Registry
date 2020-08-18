import '../../public/images/camera-gebied.png';
import '../../public/images/camera.png';
import '../../public/images/beacon.png';
import '../../public/images/sensor.png';
import '../../public/images/laadpaal.png';
import '../../public/images/slimme verkeersinformatie.png';
import '../../public/images/lantaarn.png';
import '../../public/images/marker.png';
const ICON_PATH = 'assets/';

const categories = {
  Sensor: {
    isClustered: true,
    iconUrl: `${ICON_PATH}icon-sensor@3x.png`,
    name: 'Sensor',
    enabled: true,
    description: 'Een sensor verzamelt data over een specifiek onderwerp, bijvoorbeeld luchtkwaliteit, geluid, de vulling van een afvalcontainer. Deze data wordt verstuurd naar een plek waar deze verwerkt wordt, bijvoorbeeld tot een grafiek waarin aangegeven hoe vol een container is of een programma dat een signaal afgeeft wanneer de container 80% gevuld is zodat deze wordt opgenomen in de eerstvolgende route van een auto om de container te legen.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sensor',
    wikipediaDescription: 'In the broadest definition, a sensor is a device, module, or subsystem whose purpose is to detect events or changes in its environment and send the information to other electronics, frequently a computer processor. A sensor is always used with other electronics, whether as simple as a light or as complex as a computer.',
    subtypes: [
      'Luchtkwaliteit',
      'Vervoerstromen (aantal vervoermiddelen)',
      'Geluid'
    ],
    visible: true,
    iconSize: [25, 25],
    popupAnchor: [0, -10],
  },
  SearchMarker: {
    iconSize: [50, 50],
    popupAnchor: [0, 0],
    visible: true,
    name: 'SearchMarker',
    iconUrl: `${ICON_PATH}icon-marker@3x.png`
  }
};

export default categories;
