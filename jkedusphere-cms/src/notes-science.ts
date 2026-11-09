// General Science notes (NCERT Class 6 to 10), same format as notes-computer.ts / notes-polity.ts.
// "@unit Title" = group, "## Topic {#id}" = topic page (/general-science/<id>).
// Extra format: {{formula}} shows text as a formula in code style, e.g. {{v = u + at}}.
// Do not use backticks or dollar-brace in the text.
import type { Subject } from './notes';

export const SCIENCE: Subject = {
  slug: 'general-science',
  short: 'General Science',
  h1: 'General Science Notes (NCERT Class 6 to 10)',
  title: 'General Science Notes Class 6 to 10 NCERT for JKSSB, JKPSC, SSC | JKEdusphere',
  description: 'Complete General Science notes from NCERT Class 6 to 10: physics, chemistry and biology with tables, formulas, scientists, one-liners and practice questions.',
  intro: 'Topic-wise physics, chemistry and biology notes for JKSSB, JKPSC, J&K Police, SSC and other State exams, built on the NCERT Class 6 to 10 syllabus.',
  published: '2026-11-03',
  updated: '2026-11-03',
  source: String.raw`
@unit Start Here

## Overview: What This Course Covers {#overview}

These notes cover **General Science** exactly as it is taught in **NCERT Class 6 to 10** (the same books JKBOSE follows). Exams such as **JKSSB, JKPSC, J&K Police, Naib Tehsildar, SSC, Railways and banking** draw most of their science questions from this level, so a clean revision of these books is enough for the science section.

### What you will find

| Unit | What it covers |
|---|---|
| **1. Physics** | Units and motion, force and gravitation, work and energy, sound, light, electricity, magnetism, heat, natural phenomena, energy sources and space. |
| **2. Chemistry** | Matter, separation of mixtures, atoms and molecules, atomic structure, periodic table, chemical reactions, acids, bases and salts, metals and non-metals, carbon compounds, everyday chemistry. |
| **3. Biology** | Cell and tissues, classification, plants, human body systems, control and coordination, reproduction, heredity and evolution, health and diseases, nutrition, environment, agriculture. |
| **4. Quick Revision** | Scientists and discoveries, units and instruments, one-liners, full forms and practice questions with answers. |

### How the exams ask it

- **Direct facts:** the unit of a quantity, the inventor of a device, the deficiency disease of a vitamin, the gas released in a reaction.
- **Application:** simple numericals (speed, density, Ohm's law, pH logic) and reasoning ("why does the sky look blue?").
- **Statement type:** "Which of the following is correct?" built from tables of properties, so learn the **tables** in each topic.

:::tip How to use these notes
1. Read **one topic at a time** from the list on the left (or tap **Topics** on a phone).
2. Learn the **tables first**, then the bullets. Most exam questions come from tables.
3. Formulas appear in a **code style** like {{v = u + at}}. Write each one out once while revising.
4. Revise the **Exam tip** and **Memory trick** boxes, which mark the usual traps.
5. In the last week, use only **Unit 4: Quick Revision**.
:::

:::note About the syllabus
NCERT has revised its books in recent years and a few chapters moved between classes. These notes follow the **concepts**, not the chapter numbers, so nothing important is missed. Where a fact is debated or recently changed, the topic says so.
:::

Start with the first topic: [Units, Measurement and Motion](#motion).

@unit Physics

## Units, Measurement and Motion {#motion}

### Measurement and SI units

To **measure** is to compare a quantity with a standard unit. The world uses the **SI system** (Systeme International).

| Quantity | SI unit | Symbol |
|---|---|---|
| **Length** | metre | m |
| **Mass** | kilogram | kg |
| **Time** | second | s |
| **Electric current** | ampere | A |
| **Temperature** | kelvin | K |
| **Amount of substance** | mole | mol |
| **Luminous intensity** | candela | cd |

These are the **seven base units**. Others are **derived**: area (m²), volume (m³), speed (m/s), density (kg/m³), force (newton), pressure (pascal), energy (joule), power (watt).

- **Prefixes:** kilo = 10³, hecto = 10², deca = 10, deci = 10⁻¹, centi = 10⁻², milli = 10⁻³, micro = 10⁻⁶, nano = 10⁻⁹.
- **Length:** 1 km = 1000 m; 1 m = 100 cm; 1 cm = 10 mm. **Larger units:** 1 light year is about 9.46 × 10¹⁵ m; 1 astronomical unit (AU) is about 1.5 × 10¹¹ m (Sun to Earth); 1 parsec is about 3.26 light years.
- **Time:** 1 hour = 3600 s. A **simple pendulum** or a **quartz clock** keeps time; an **atomic clock** is the most accurate.
- **Measuring length:** a **metre scale** (least count 1 mm), **vernier callipers** (0.1 mm or less) and **screw gauge** (0.01 mm).
- **Measuring a curved line:** use a thread, then measure the thread against the scale.
- **Mass** is the amount of matter (kg). **Weight** is the force of gravity on it (newton).

### Motion

An object is in **motion** if its position changes with time with respect to a **reference point**. Rest and motion are **relative**: a passenger is at rest with respect to the bus but moving with respect to the road.

| Type of motion | Meaning | Example |
|---|---|---|
| **Rectilinear (linear)** | Along a straight line | A car on a straight road |
| **Circular** | Along a circle | Tip of a clock hand, a merry-go-round |
| **Rotational** | A body spins about its own axis | Earth, a top, a fan |
| **Periodic (oscillatory)** | Repeats after equal intervals | Pendulum, swing, a vibrating string |
| **Random** | No fixed pattern | A fly buzzing, a football in play |

### Distance, displacement, speed, velocity

| Term | Meaning | Type | Unit |
|---|---|---|---|
| **Distance** | Total path length covered | **Scalar** | m |
| **Displacement** | Shortest straight line from start to end, with direction | **Vector** | m |
| **Speed** | Distance covered per unit time | Scalar | m/s |
| **Velocity** | Displacement per unit time | Vector | m/s |
| **Acceleration** | Rate of change of velocity | Vector | m/s² |

{{Speed = distance / time}}  {{Velocity = displacement / time}}  {{Acceleration a = (v - u) / t}}

- **Scalar** quantities have only magnitude; **vector** quantities have magnitude **and** direction.
- A body in a **full circle** has **zero displacement** but non-zero distance.
- **Uniform motion:** equal distances in equal times. **Non-uniform:** unequal distances in equal times.
- **Average speed = total distance / total time.**
- **Retardation (deceleration)** is a negative acceleration.
- **Conversion:** to change km/h to m/s, multiply by 5/18; to change m/s to km/h, multiply by 18/5. So 72 km/h = 20 m/s.
- **Instruments:** **speedometer** shows speed; **odometer** shows distance travelled.

### Equations of motion (uniform acceleration)

| Equation | Connects |
|---|---|
| {{v = u + at}} | final velocity, initial velocity, time |
| {{s = ut + (1/2) a t²}} | displacement, time |
| {{v² = u² + 2as}} | velocity and displacement (no time) |

Here **u** = initial velocity, **v** = final velocity, **a** = acceleration, **t** = time, **s** = displacement.

**Worked example.** A car starts from rest and reaches 20 m/s in 5 s. Then a = (20 - 0) / 5 = **4 m/s²**, and s = 0 + (1/2) × 4 × 25 = **50 m**.

**Free fall:** an object falling only under gravity has **a = g = 9.8 m/s²** (about 10 m/s² for quick work). Thrown **upward**, it slows by g until velocity is zero at the top. A stone dropped from rest falls {{s = (1/2) g t²}}.

### Graphs of motion

| Graph | Straight line means | Slope gives | Area gives |
|---|---|---|---|
| **Distance-time** | Uniform speed | **Speed** | |
| **Velocity-time** | Uniform acceleration (slanted); uniform velocity (horizontal) | **Acceleration** | **Displacement** |

A **horizontal** line on a distance-time graph means the body is **at rest**. A **steeper** line means **higher speed**.

### Uniform circular motion

A body moving in a circle at **constant speed** still **accelerates**, because its **direction keeps changing**. The force that keeps it in the circle is the **centripetal force**, directed **towards the centre**. The tangent to the circle shows the direction of velocity at any point.

:::tip Exam tip
**Distance can exceed displacement, never the reverse.** **Area under a v-t graph = displacement.** **Slope of a v-t graph = acceleration.** **Circular motion is accelerated even at constant speed.** **g = 9.8 m/s².**
:::

:::mem Memory trick
**S**peed is **S**calar, **V**elocity is **V**ector. In equations of motion: **"VUAT"** (v = u + at).
:::

## Force, Laws of Motion and Gravitation {#force-gravitation}

### Force

A **force** is a push or a pull. It can change an object's **speed, direction, shape or state of rest**. Unit: **newton (N)**; 1 N = 1 kg m/s².

| Force | Description |
|---|---|
| **Muscular** | Due to the action of muscles (lifting, pushing) |
| **Gravitational** | Earth's pull on all objects |
| **Magnetic** | Between magnets, attracts iron, cobalt, nickel |
| **Electrostatic** | Between charged bodies |
| **Frictional** | Opposes relative motion between surfaces |

**Contact forces** need touching (muscular, friction); **non-contact forces** act at a distance (gravity, magnetic, electrostatic).

### Friction

Friction opposes motion between two surfaces in contact. It depends on the **roughness** of surfaces and the **force pressing them together**, not on the contact area (for solids).

| Type | Meaning |
|---|---|
| **Static** | Acts before motion starts; **largest** |
| **Sliding (kinetic)** | When one body slides over another |
| **Rolling** | When a body rolls; **smallest**, which is why wheels are used |

- **Advantages:** we can walk, grip, write, brakes work, nails hold.
- **Disadvantages:** wear and tear, heat, wasted energy.
- **Reduced by:** lubricants (oil, grease), polishing, **ball bearings**, streamlined shapes, wheels.
- **Increased by:** rough surfaces, treads on tyres, spikes on shoes.
- **Fluid friction (drag)** acts on objects moving through liquids and gases.

### Newton's laws of motion

| Law | Statement | Everyday example |
|---|---|---|
| **First (law of inertia)** | A body stays at rest or in uniform straight-line motion unless acted on by an **unbalanced force** | Passengers jerk forward when a bus brakes suddenly |
| **Second** | The rate of change of **momentum** is proportional to the applied force; {{F = ma}} | A heavier cart needs more force for the same acceleration |
| **Third** | For every action there is an **equal and opposite reaction** (on different bodies) | Rocket launch, recoil of a gun, swimming |

- **Inertia** is the tendency of a body to resist a change in its state. **Mass** is the measure of inertia. A heavier body has **more inertia**.
- **Momentum** {{p = mv}} (unit kg m/s); it is a vector.
- **Impulse** = force x time = change in momentum.
- **Conservation of momentum:** in a collision with no external force, **total momentum before = total momentum after**.
- **Balanced forces** do not change motion; **unbalanced forces** do.

### Gravitation

- **Universal law (Newton):** every object attracts every other with a force **directly proportional to the product of masses** and **inversely proportional to the square of the distance**.

{{F = G m₁ m₂ / r²}}   with   {{G = 6.67 × 10⁻¹¹ N m² / kg²}}

- **G** is the universal gravitational constant (found by **Cavendish**). **g** is the acceleration due to gravity.
- **Free-fall acceleration:** {{g = GM / R²}}; on Earth **g = 9.8 m/s²**.
- **Weight** {{W = mg}}. Mass is **constant everywhere**; weight **changes** with g.
- **g varies:** highest at the **poles**, lowest at the **equator**; **decreases** with height and depth; **zero at the centre** of the Earth.
- **On the Moon**, g is about **1/6** of Earth's, so weight is one-sixth. The mass remains the same.
- **In free fall (a satellite), objects feel weightless.**
- **Escape velocity** of Earth: about **11.2 km/s**. **Orbital velocity** near Earth: about **7.9 km/s**.
- **Kepler's laws** describe planetary motion: planets move in **ellipses** with the Sun at one focus; a planet sweeps **equal areas in equal times**; the square of the orbital period is proportional to the cube of the average distance.

### Pressure, density and buoyancy

| Quantity | Formula | Unit |
|---|---|---|
| **Pressure** | {{P = F / A}} (force per unit area) | pascal (Pa) = N/m² |
| **Density** | {{d = mass / volume}} | kg/m³ |
| **Relative density** | density of substance / density of water | no unit |

- Pressure is **more** when the area is **small** (sharp knife, nails, pointed needle); **less** when area is large (wide tyres, camel feet, snow shoes).
- **Liquid pressure** increases with **depth** and acts in all directions. Dams are **thicker at the bottom**.
- **Atmospheric pressure** at sea level is about **101,325 Pa = 1 atm**. A **barometer** measures it (invented by **Torricelli**); a **manometer** measures gas pressure.
- **Pascal's law:** pressure applied to an enclosed fluid is **transmitted equally**. Used in **hydraulic lift and brakes**.
- **Buoyancy (upthrust):** the upward force on an object in a fluid.
- **Archimedes' principle:** the upthrust equals the **weight of fluid displaced**.
- **Floating:** an object floats if its **density is less than the liquid's**; it sinks if more. **Ships** float because the displaced water weighs as much as the ship. **Plimsoll line** marks safe loading.
- **Density of water = 1000 kg/m³** (1 g/cm³) at 4 degrees C. **Hydrometer** measures the density of liquids; **lactometer** checks milk purity.
- **Pressure units:** 1 atm = 760 mm of mercury.

:::tip Exam tip
**Mass is constant; weight changes with place.** **g is maximum at the poles.** **Action and reaction act on different bodies.** **Archimedes' principle = weight of displaced fluid.** **Hydraulic lift works on Pascal's law.** **Momentum = mass x velocity.**
:::

## Work, Energy and Power {#work-energy}

### Work

**Work** is done when a force moves an object in the direction of the force.

{{W = F x d x cos(theta)}}  or simply  {{W = F x s}}

- **Unit:** joule (J). 1 J = work done when 1 N moves an object 1 m. **CGS unit:** erg; 1 J = 10⁷ erg.
- **No work** is done if **displacement is zero** (pushing a wall) or the force is **perpendicular** to displacement (carrying a bag horizontally).
- Work is **positive** when force and displacement are in the same direction; **negative** when opposite (friction).

### Energy

**Energy** is the capacity to do work. Unit: **joule**. It exists in many forms: mechanical, heat, light, sound, chemical, electrical, nuclear.

| Type | Formula | Meaning |
|---|---|---|
| **Kinetic energy (KE)** | {{KE = (1/2) m v²}} | Energy due to **motion** |
| **Potential energy (PE)** | {{PE = m g h}} | Energy due to **position or condition** (height, stretched spring) |

- KE becomes **four times** if velocity is **doubled**.
- **Law of conservation of energy:** energy can neither be created nor destroyed, only changed from one form to another. The **total** stays constant. In a falling object, PE **decreases** while KE **increases**.
- **Mass-energy equivalence (Einstein):** {{E = m c²}}; the basis of **nuclear energy**.

| Device | Energy change |
|---|---|
| **Electric bulb** | Electrical to light and heat |
| **Electric motor** | Electrical to mechanical |
| **Generator (dynamo)** | Mechanical to electrical |
| **Microphone** | Sound to electrical |
| **Loudspeaker** | Electrical to sound |
| **Solar cell** | Light to electrical |
| **Battery (cell)** | Chemical to electrical |
| **Photosynthesis** | Light to chemical |
| **Candle** | Chemical to heat and light |
| **Hydroelectric plant** | Water PE to electrical |

### Power

**Power** is the **rate of doing work**: {{P = W / t}}. Unit: **watt (W)**; 1 W = 1 J/s.

- **1 kilowatt (kW) = 1000 W.** **1 horsepower (HP) = 746 W.**
- **Commercial unit of energy:** **kilowatt-hour (kWh)** = **1 unit** of electricity. 1 kWh = 3.6 × 10⁶ J.
- **Electricity bill example:** a 100 W bulb used 10 hours a day for 30 days uses 100 × 10 × 30 / 1000 = **30 units**.

:::tip Exam tip
**No displacement = no work.** **Doubling speed multiplies KE by four.** **Watt = joule per second.** **1 kWh = 3.6 million joules.** **Energy is conserved; it only changes form.**
:::

## Sound {#sound}

### Production and propagation

Sound is produced by **vibrating** bodies. It is a **mechanical, longitudinal wave** and needs a **medium** (solid, liquid or gas); it **cannot travel in a vacuum**.

- **Longitudinal wave:** particles vibrate **parallel** to the direction of the wave, forming **compressions** (high pressure) and **rarefactions** (low pressure).
- **Transverse wave:** particles vibrate **perpendicular** to the wave (light, waves on a string) with **crests and troughs**.
- Sound is a **longitudinal** wave in air.

### Characteristics of a wave

| Term | Meaning | Unit |
|---|---|---|
| **Frequency (f)** | Vibrations per second | hertz (Hz) |
| **Time period (T)** | Time for one vibration; {{T = 1 / f}} | second |
| **Wavelength** | Distance between two successive compressions or crests | metre |
| **Amplitude** | Maximum displacement from the mean position | metre |
| **Speed** | {{v = f x wavelength}} | m/s |

### Characteristics of sound

| Property | Depends on | Notes |
|---|---|---|
| **Loudness** | **Amplitude** | Measured in **decibel (dB)**. Normal talk about 60 dB; above 120 dB is painful |
| **Pitch** | **Frequency** | High frequency = high pitch (shrill); low = grave. A woman's voice has a higher pitch than a man's |
| **Quality (timbre)** | Waveform | Lets us tell two instruments or voices apart |

### Speed of sound

- Fastest in **solids**, then **liquids**, slowest in **gases**: solid > liquid > gas.
- In **air at 25 degrees C**: about **346 m/s** (about 331 m/s at 0 degrees C). It **rises with temperature**.
- In **water** about 1500 m/s; in **iron** about 5000 m/s.
- **Light is far faster** (3 × 10⁸ m/s), so lightning is seen before thunder is heard.

### Range of hearing

| Range | Frequency | Examples |
|---|---|---|
| **Infrasonic** | **Below 20 Hz** | Earthquakes, whales, elephants, rhinoceros |
| **Audible** | **20 Hz to 20,000 Hz** (human) | Speech, music |
| **Ultrasonic** | **Above 20,000 Hz** | **Bats, dolphins, dogs** (up to about 50,000 Hz), porpoises |

### Reflection of sound

- **Echo:** sound heard again after reflection. The reflecting surface must be **at least 17 m away** (for a delay of 0.1 s, since the ear keeps a sound for 0.1 s).
- **Reverberation:** repeated reflections in a big hall, reduced by **sound-absorbing** materials (curtains, carpets, acoustic tiles).
- **Uses of reflection:** **megaphone, stethoscope, soundboards, curved ceilings** in halls.
- **SONAR (Sound Navigation and Ranging):** uses **ultrasonic** waves to measure depth, locate submarines, shoals of fish. Distance = (speed x time) / 2.
- **Ultrasound uses:** cleaning delicate parts, **ultrasonography** (scanning), breaking kidney stones, detecting cracks in metals.
- **Bats** find prey by **echolocation**.

### Human ear

| Part | Function |
|---|---|
| **Pinna (outer ear)** | Collects sound |
| **Ear canal and eardrum (tympanic membrane)** | Sound vibrates the eardrum |
| **Ossicles (hammer, anvil, stirrup)** | The **three smallest bones**; amplify vibrations |
| **Cochlea** | Converts vibrations into **electrical signals** |
| **Auditory nerve** | Carries signals to the **brain** |

:::tip Exam tip
**Sound cannot travel in vacuum.** **Loudness = amplitude; pitch = frequency.** **Human range: 20 Hz to 20 kHz.** **Echo needs at least 17 m.** **SONAR uses ultrasound.** **Stirrup is the smallest bone.**
:::

## Light: Reflection, Refraction and the Eye {#light}

### Nature of light

Light is an **electromagnetic wave** that needs **no medium**. Its speed in vacuum is **3 × 10⁸ m/s**. It travels in **straight lines** (rectilinear propagation), which explains **shadows**, **eclipses** and the **pinhole camera**.

- **Luminous** objects give their own light (Sun, stars, bulb); **non-luminous** objects are seen by reflected light (Moon).
- **Transparent** (glass, clear water), **translucent** (butter paper, frosted glass) and **opaque** (wood, metal) objects pass all, some or no light.
- **Time taken by light:** Sun to Earth about **8 minutes 20 seconds**; Moon to Earth about **1.3 seconds**.

### Reflection

**Laws:** (1) the **angle of incidence = angle of reflection**; (2) the incident ray, reflected ray and **normal** lie in the **same plane**.

- **Plane mirror image:** virtual, erect, same size, **laterally inverted**, as far behind as the object is in front.
- **Regular reflection** (smooth surface) gives clear images; **diffuse reflection** (rough surface) scatters light.
- **Two mirrors at angle** theta give 360/theta - 1 images; **parallel mirrors** give infinite images; **kaleidoscope** uses this.

### Spherical mirrors

| Mirror | Surface | Behaviour | Uses |
|---|---|---|---|
| **Concave** | Reflecting surface curves **inward** | Converging | **Shaving mirror, torches, headlights, dentist's mirror, solar furnaces** |
| **Convex** | Reflecting surface bulges **outward** | Diverging; always virtual, erect, smaller image; **wide field of view** | **Rear-view mirror** of vehicles, street lamps |

- **Focal length** {{f = R / 2}} (R is the radius of curvature).
- **Mirror formula:** {{1/v + 1/u = 1/f}}. **Magnification** {{m = h'/h = - v/u}}.
- **Sign convention:** distances measured from the pole; **in the direction of incident light = positive**; focal length of a **concave mirror is negative**, of a **convex mirror positive**.
- **Concave mirror images:** object beyond C gives a real, inverted, smaller image; object between P and F gives a **virtual, erect, enlarged** image (shaving mirror).

### Refraction

Light bends when it passes from one medium to another because its **speed changes**.

- **Denser to rarer:** bends **away** from the normal. **Rarer to denser:** bends **towards** the normal.
- **Snell's law:** {{sin i / sin r = n}} (constant). **Refractive index** {{n = c / v}}; higher n means light slows more (**optically denser**).
- Examples: **a pencil appears bent in water**, a pool seems **shallower**, **stars twinkle**, a **rainbow**.
- **Total internal reflection:** when light goes from a denser to a rarer medium at an angle larger than the **critical angle**, it reflects fully. Used in **optical fibres**, **endoscopes**, **diamonds' sparkle**, and in **mirages**.

### Lenses

| Lens | Shape | Nature | Used in |
|---|---|---|---|
| **Convex (converging)** | Thick in the middle | Converges rays; real or virtual images | **Magnifying glass, microscope, telescope, camera, projector, spectacles for hypermetropia** |
| **Concave (diverging)** | Thin in the middle | Always virtual, erect, smaller image | **Spectacles for myopia, peepholes** |

- **Lens formula:** {{1/v - 1/u = 1/f}}. **Magnification** {{m = v/u}}.
- **Power of a lens** {{P = 1/f}} (f in metres). Unit: **dioptre (D)**. **Convex lens: positive power; concave: negative**.
- The **combined power** of lenses in contact is the **sum**.

### Human eye

| Part | Function |
|---|---|
| **Cornea** | Transparent front part; most refraction happens here |
| **Iris** | Coloured muscle; controls the size of the **pupil** |
| **Pupil** | Opening that regulates light entering the eye |
| **Lens** | **Convex**; focuses the image on the retina; **ciliary muscles** change its focal length (**accommodation**) |
| **Retina** | Screen where the image forms; has **rods** (dim light, black and white) and **cones** (bright light, colour) |
| **Optic nerve** | Sends signals to the brain |

- **Image on the retina** is real and **inverted**; the brain makes it erect.
- **Least distance of distinct vision** is **25 cm** (near point). The **far point** is infinity.
- **Persistence of vision:** the image stays on the retina for about **1/16 second**; cinema depends on it.
- **Blind spot:** the point where the optic nerve leaves the retina; no rods or cones.

| Defect | Cause | Sees | Correction |
|---|---|---|---|
| **Myopia (short-sightedness)** | Eyeball too long, or lens too curved | Near clear, **far blurred** | **Concave lens** |
| **Hypermetropia (long-sightedness)** | Eyeball too short | Far clear, **near blurred** | **Convex lens** |
| **Presbyopia** | Weak ciliary muscles with age | Difficulty with near objects | **Bifocal lens** |
| **Cataract** | Lens becomes cloudy | Blurred vision | **Surgery** |
| **Astigmatism** | Uneven cornea | Distorted | **Cylindrical lens** |

- **Colour blindness** is the inability to distinguish colours (often red and green); it is **genetic**.
- **Night blindness** is caused by **Vitamin A** deficiency.
- **Eye donation:** only the **cornea** is used.
- **Braille** is the reading system for the visually impaired (invented by **Louis Braille**).

### Dispersion, scattering and natural effects

- **Dispersion:** white light splits into seven colours by a **prism**: **VIBGYOR** (Violet, Indigo, Blue, Green, Yellow, Orange, Red). **Red bends least, violet most.** **Newton** showed it.
- **Rainbow:** dispersion, refraction and **internal reflection** by water drops; seen when the Sun is **behind** the observer.
- **Scattering:** the **blue** sky is because blue light is scattered most (**Rayleigh scattering**). **Red** has the longest wavelength and scatters least, so it is used for **danger signals**. The Sun looks **red at sunrise and sunset** because light travels a longer path and the blue is scattered away.
- **Twinkling of stars** is due to atmospheric refraction. **Planets do not twinkle** because they are close and appear as extended sources.
- **Advanced sunrise and delayed sunset** (about 2 minutes) are due to refraction.
- **Primary colours of light:** **red, green, blue**. **Secondary:** cyan, magenta, yellow. **Primary pigments:** cyan, magenta, yellow (printing). **Black** = no light; **white** = all colours.
- **Colour of an object** is the colour it reflects.

:::tip Exam tip
**Convex mirror = rear-view mirror.** **Concave mirror = shaving mirror, headlights.** **Myopia = concave lens; hypermetropia = convex lens.** **Power in dioptre; concave lens power is negative.** **Blue sky = scattering.** **Optical fibre = total internal reflection.** **Red bends least.**
:::

## Electricity {#electricity}

### Charge and current

- **Charge** (unit **coulomb, C**) is positive or negative. **Like charges repel; unlike attract.** The charge of one electron is **1.6 × 10⁻¹⁹ C**.
- **Rubbing** transfers electrons: glass rubbed with silk becomes **positive**; plastic or ebonite rubbed with fur becomes **negative**.
- The **gold-leaf electroscope** detects charge. **Lightning** is a huge electric discharge; **lightning conductors** protect buildings.
- **Electric current** is the rate of flow of charge: {{I = Q / t}}. Unit: **ampere (A)** (1 A = 1 C/s). Measured by an **ammeter**, connected in **series**.
- **Conventional current** flows from **positive to negative**; electron flow is the opposite.
- **Potential difference** (voltage): work done per unit charge, {{V = W / Q}}. Unit: **volt (V)**. Measured by a **voltmeter**, connected in **parallel**.
- A **cell** is a source of potential difference; a **battery** is a group of cells.

### Conductors and insulators

| Conductors | Insulators |
|---|---|
| Metals (silver is the best, then copper, aluminium), graphite, acids and salt solutions, human body, Earth | Rubber, plastic, glass, wood, dry paper, air, pure water |

### Ohm's law and resistance

**Ohm's law:** at constant temperature, current through a conductor is **proportional to the potential difference**: {{V = I R}}. **R** is **resistance** (unit **ohm**).

- **Resistance** {{R = (resistivity x length) / area}}: it **increases with length** and **decreases with thicker area**. It **rises with temperature** for metals.
- **Resistivity** depends on the **material** only. **Alloys** (nichrome, constantan, manganin) have higher resistivity than pure metals, so they are used in **heating elements**.
- **Rheostat:** a variable resistor. **Fuse:** a thin wire of low melting point that melts when current is too high.

### Series and parallel combination

| Feature | Series | Parallel |
|---|---|---|
| **Current** | Same through all | Divides among branches |
| **Voltage** | Divides | Same across all |
| **Total resistance** | {{R = R₁ + R₂ + R₃}} (bigger) | {{1/R = 1/R₁ + 1/R₂ + 1/R₃}} (smaller) |
| **If one fails** | The whole circuit stops | Others keep working |
| **Use** | Fuses, switches, old festive lights | **Household wiring** |

**Worked example.** Two resistors of 4 ohm and 6 ohm in series: R = 10 ohm. In parallel: R = (4 × 6) / (4 + 6) = **2.4 ohm**. On a 12 V supply, the series current is 12/10 = **1.2 A**.

### Heating effect and power

- **Joule's law:** {{H = I² R t}}. Used in **heaters, geysers, irons, toasters, electric bulbs, fuses**.
- **Electric power** {{P = V I = I² R = V² / R}}. Unit **watt**. **1 kWh = 1 unit.**
- **Filament** of a bulb is of **tungsten** (very high melting point, 3380 degrees C); the bulb is filled with **argon or nitrogen** to protect it.
- **Fuse wire** is made of a **tin-lead alloy**.

### Domestic circuits

- **India's supply:** **220 to 240 V, 50 Hz AC**.
- **Three wires:** **live (red)** carries current, **neutral (black)** returns it, **earth (green)** is the safety wire.
- **Earthing** sends leakage current to the ground, preventing shocks.
- **MCB (miniature circuit breaker)** and **fuse** protect from **short circuit** and **overloading**. **Short circuit** happens when live and neutral touch; **overloading** when too many appliances draw current.
- **Appliances are connected in parallel.** **Switch is on the live wire.**

### Cells and batteries

| Type | Examples |
|---|---|
| **Primary (non-rechargeable)** | Dry cell (**Leclanche cell**), alkaline cell |
| **Secondary (rechargeable)** | **Lead-acid battery** (vehicles, 12 V), **lithium-ion** (phones, laptops), nickel-cadmium |

- **Volta** made the first **voltaic cell**; **Galvani** studied "animal electricity".
- **Electroplating** (silver, gold, chromium coating) and **electrolysis** use the **chemical effect** of current.

:::tip Exam tip
**Ammeter in series; voltmeter in parallel.** **Household appliances in parallel.** **Series resistance adds; parallel resistance is less than the smallest.** **Fuse melts and breaks the circuit.** **Earth wire is green.** **Alloys (nichrome) in heaters.** **1 kWh = 1 unit.**
:::

:::mem Memory trick
**V = I R** : the triangle **V on top, I and R below**. **P = V I** : **"Pee Vee Eye"**.
:::

## Magnetism and Electromagnetic Effects {#magnetism}

### Magnets

- A **magnet** attracts **iron, nickel, cobalt**. **Magnetic substances** are attracted; **non-magnetic** ones (wood, plastic, copper, aluminium) are not.
- Every magnet has **two poles**, **north and south**; they cannot be separated (cut a magnet and each piece has two poles). **Like poles repel, unlike attract.** **Repulsion is the sure test** of a magnet.
- A freely suspended magnet points **north-south**: the principle of the **compass**. The Earth behaves like a **giant bar magnet**; its **geographic south** is near the **magnetic north**.
- **Natural magnet:** **lodestone** (magnetite). **Artificial magnets:** bar, horseshoe, needle, ring, cylindrical.
- **Permanent magnets** use **steel, alnico**; **electromagnets** use **soft iron**.
- **Magnetic field:** the region around a magnet where its force acts. **Field lines** go **from north to south outside** the magnet, and **never intersect**; closer lines mean a **stronger field**.
- Magnetic field strength is measured in **tesla (T)**.

### Magnetic effect of current

- **Oersted (1820)** found that a current-carrying wire **deflects a compass needle**.
- **Right-hand thumb rule:** hold the wire with the **thumb along the current**; the curled fingers show the **field direction**.
- **Solenoid:** a coil of many turns; it acts like a **bar magnet**. A soft-iron core inside makes an **electromagnet**.
- **Uses of electromagnets:** **electric bells, cranes** lifting scrap, **MRI**, loudspeakers, **relays**.

### Force on a current-carrying conductor

- A conductor in a magnetic field feels a force. **Fleming's left-hand rule:** **thumb = force, forefinger = field, middle finger = current** (all mutually perpendicular).
- **Electric motor** converts **electrical to mechanical energy**; it uses this force. Parts: **armature coil, commutator (split ring), brushes, magnet**.

### Electromagnetic induction

- **Faraday** (1831) showed that a changing magnetic field around a coil **induces** a current.
- **Fleming's right-hand rule:** thumb = motion, forefinger = field, middle finger = **induced current**.
- **Generator (dynamo)** converts **mechanical to electrical energy**. It uses **slip rings** and gives **AC**.
- **AC (alternating current)** reverses direction regularly (50 Hz in India, so 100 reversals per second); **DC** flows one way. AC is **easier to transmit over long distances**.
- **Transformer** changes AC voltage using mutual induction: **step-up** raises voltage, **step-down** lowers it; it does **not work on DC**.

| Device | Energy change | Rule |
|---|---|---|
| **Motor** | Electrical to mechanical | Fleming's **left** hand |
| **Generator** | Mechanical to electrical | Fleming's **right** hand |

:::tip Exam tip
**Motor = left-hand rule; generator = right-hand rule.** **Repulsion is the true test of a magnet.** **Field lines never cross.** **Oersted: electricity produces magnetism; Faraday: magnetism produces electricity.** **Transformer works only on AC.**
:::

## Heat and Temperature {#heat}

### Heat and temperature

- **Heat** is a form of energy that flows from a **hotter** to a **colder** body. Unit: **joule** (also **calorie**; 1 cal = 4.18 J).
- **Temperature** shows how **hot or cold** a body is. Unit: **kelvin** (SI), **degree Celsius**, **degree Fahrenheit**.
- {{K = C + 273}}  {{F = (9/5) C + 32}}  {{C / 5 = (F - 32) / 9}}
- **Freezing point of water** = 0 C = 32 F = 273 K; **boiling point** = 100 C = 212 F = 373 K.
- **-40 degrees** is the same on Celsius and Fahrenheit.
- **Absolute zero** = 0 K = -273 C, the lowest possible temperature.
- **Normal human body temperature:** **37 C = 98.6 F**.

### Thermometers

| Thermometer | Use |
|---|---|
| **Clinical thermometer** | Human body temperature; range **35 C to 42 C** (94 F to 108 F); has a **kink** so the mercury does not fall; **shake** to reset |
| **Laboratory thermometer** | Range **-10 C to 110 C** |
| **Digital thermometer** | Uses a sensor; no mercury |
| **Pyrometer** | Very high temperatures (furnaces) |

Mercury is used because it is a **good conductor, expands evenly, and does not wet glass**. **Alcohol** is used for very low temperatures. Never use a clinical thermometer to measure the boiling water.

### Modes of heat transfer

| Mode | Medium | How it works | Example |
|---|---|---|---|
| **Conduction** | Mainly **solids** | Heat passes **particle to particle** without the particles moving | Spoon in hot tea gets hot |
| **Convection** | **Liquids and gases** | **Hot fluid rises**, cold sinks; currents form | Boiling water, **sea breeze and land breeze**, ventilators |
| **Radiation** | **No medium needed** | Electromagnetic waves | **Heat from the Sun**, a fire |

- **Good conductors:** metals (silver best, then copper). **Bad conductors (insulators):** wood, plastic, air, wool, water (poor).
- **Dark, rough** surfaces **absorb and radiate** heat better; **white, shiny** surfaces **reflect** it. So **white clothes** in summer and **dark clothes** in winter.
- **Woollen clothes** keep us warm because **trapped air** is a poor conductor.
- **Thermos flask (vacuum flask)** reduces all three modes: **vacuum** (no conduction or convection), **silvered walls** (reflect radiation), **cork or plastic stopper**.
- **Sea breeze** blows **by day** (land is hotter, air rises, cool air comes from the sea); **land breeze** at **night**.

### Expansion

- Solids, liquids and gases **expand on heating**. **Gases expand most; solids least.**
- Examples: gaps in **railway tracks** and bridges; **iron rims fitted on cartwheels**; **overhead wires sag in summer**.
- **Anomalous expansion of water:** water **contracts from 0 C to 4 C**, has its **maximum density at 4 C**, then expands. So **lakes freeze from the top**, and aquatic life survives below the ice.

### Specific heat and latent heat

- **Specific heat capacity** is the heat needed to raise **1 kg by 1 degree C**: {{Q = m c delta-T}}. Unit **J/(kg K)**.
- **Water has a very high specific heat** (4200 J/kg K), so it **heats and cools slowly**; hence its use as a **coolant** and the **mild climate near seas**.
- **Latent heat:** heat absorbed or released **during a change of state without any change in temperature**.
  - **Latent heat of fusion** (ice to water): **336 kJ/kg**.
  - **Latent heat of vaporisation** (water to steam): **2260 kJ/kg**.
- **Steam burns more than boiling water** because of its extra **latent heat**.
- **Evaporation causes cooling** (sweating, earthen pots, wet cloth on forehead).
- **Ice at 0 C cools better than water at 0 C** (it absorbs the latent heat of fusion).

:::tip Exam tip
**Clinical thermometer: 35 to 42 C, with a kink.** **Conduction = solids; convection = fluids; radiation = no medium.** **Water is densest at 4 C.** **Water has high specific heat.** **Steam burns are worse than hot-water burns (latent heat).** **-40 C = -40 F.**
:::

## Natural Phenomena, Energy Sources and Space {#energy-space}

### Natural phenomena

- **Lightning:** caused by **discharge of electric charge** between clouds or between a cloud and the ground. **Benjamin Franklin** showed lightning is electrical. **Thunder** is the sound; lightning is seen first because light is faster.
- **Safety in thunderstorms:** stay indoors, avoid open fields, tall trees, metal and water; use **lightning conductors**.
- **Earthquake:** sudden release of energy in the Earth's crust, producing **seismic waves**. Recorded by a **seismograph** on the **Richter scale** (magnitude) or the **Mercalli scale** (intensity). The **epicentre** is the point on the surface above the **focus**. Waves: **P (primary), S (secondary), L (surface)**.
- **Cyclone, tsunami and volcano** are other natural hazards. **Tsunami** is caused mainly by undersea earthquakes.
- **Static electricity:** charged objects attract light things.

### Sources of energy

| Conventional (non-renewable) | Non-conventional (renewable) |
|---|---|
| **Coal, petroleum, natural gas**, nuclear fuels | **Solar, wind, hydro, tidal, geothermal, biomass, ocean thermal** |

- **Fossil fuels** (coal, oil, gas) formed over millions of years from dead organisms; burning them causes **air pollution, greenhouse gases and acid rain**.
- **Hydroelectric power:** the **PE of stored water** turns turbines. **Tehri, Bhakra Nangal, Baglihar and Salal** are examples; J&K has high hydro potential on the **Chenab and Jhelum**.
- **Thermal power:** burning coal; **India's main source of electricity**.
- **Solar energy:** **solar cells (photovoltaic)** convert sunlight to electricity; **solar cookers, heaters, panels**. A **solar constant** is about **1.4 kW/m²**.
- **Wind energy:** windmills and **wind turbines**; **Muppandal** in Tamil Nadu is among the largest wind farms.
- **Biogas:** from **cow dung and organic waste**; mainly **methane** (about 65 to 70%); the leftover **slurry** is a good manure. Made in **gobar gas plants**.
- **Biomass:** wood, dung cakes, crop residue.
- **Geothermal:** heat from within the Earth. **Tidal:** from ocean tides. **Ocean thermal (OTEC)**: from temperature difference of sea water.
- **Nuclear energy:** from **nuclear fission** (splitting of heavy nuclei like **uranium-235**) or **fusion** (joining of light nuclei like **hydrogen**, as in the Sun and stars). **Nuclear reactors** use fission. **Hydrogen bomb** uses fusion. **Chain reaction** and **control rods** (cadmium, boron) are key terms.
- **Nuclear power plants in India:** **Tarapur, Kalpakkam, Kudankulam, Rawatbhata, Narora, Kakrapar, Kaiga**.
- **Radioactivity** was discovered by **Henri Becquerel**; **Marie Curie** and **Pierre Curie** found polonium and radium. **Alpha** (helium nucleus), **beta** (electron), **gamma** (photon) rays; gamma has the highest penetration.

### Good fuel and calorific value

- **Calorific value** is the heat produced by burning **1 kg** of fuel (kJ/kg). **Hydrogen** has the highest calorific value; **LPG** and **CNG** are cleaner than coal and petrol.

### Space and the solar system

| Body | Facts |
|---|---|
| **Sun** | A **star**; about **99.8% of the solar system's mass**; hydrogen and helium; **fusion** powers it |
| **Planets (8)** | **Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune** |
| **Inner (terrestrial/rocky)** | Mercury, Venus, Earth, Mars |
| **Outer** | **Jupiter and Saturn** (gas giants), **Uranus and Neptune** (ice giants) |
| **Mercury** | Smallest and nearest to the Sun; **no moon** |
| **Venus** | **Hottest** planet; rotates **east to west**; called the **morning and evening star**; Earth's twin |
| **Earth** | **Blue planet**; only planet known with life; **one moon** |
| **Mars** | **Red planet** (iron oxide); two moons **Phobos and Deimos**; **Olympus Mons** |
| **Jupiter** | **Largest** planet; **Great Red Spot**; its moon **Ganymede** is the largest moon in the solar system |
| **Saturn** | **Rings**; **least dense** (would float on water) |
| **Uranus** | **Rotates on its side** (axis tilted about 98 degrees) |
| **Neptune** | Farthest planet; **deep blue** |

- **Pluto** was reclassified as a **dwarf planet** in **2006** (IAU), along with **Ceres, Eris, Haumea, Makemake**.
- **Asteroids** (mostly between Mars and Jupiter), **comets** (ice and dust with a tail pointing away from the Sun; **Halley's comet** returns about every **76 years**), **meteors** ("shooting stars") and **meteorites** (reach the ground).
- **Moon:** Earth's only natural satellite; **no atmosphere**; takes about **27.3 days** to orbit; the same face always shows to Earth; **Neil Armstrong** first walked on it (**Apollo 11, 1969**). **Chandrayaan-3** landed near the Moon's **south pole in August 2023**, making India the **fourth country to soft-land** and the first at the south polar region.
- **Phases of the Moon:** **new moon** (Amavasya), **full moon** (Purnima), **waxing** and **waning**. **Solar eclipse:** Moon between Sun and Earth (at new moon). **Lunar eclipse:** Earth between Sun and Moon (at full moon).
- **Day and night** are due to **rotation** (24 hours); **seasons** are due to **revolution** and the **tilt of the axis** (23.5 degrees).
- **Stars** form in **nebulae**; **constellations** include **Ursa Major (Saptarishi)**, **Orion**. The **Pole Star (Polaris)** appears fixed in the north. The **nearest star** after the Sun is **Proxima Centauri**. **Galaxy:** our galaxy is the **Milky Way**; the nearest large galaxy is **Andromeda**.
- **Black hole:** a region of extreme gravity from which not even light can escape.

### Artificial satellites and ISRO

- **Geostationary satellites** orbit at about **36,000 km** above the equator, with a period of **24 hours**, so they appear fixed; used for **communication and TV**. **Polar (sun-synchronous) satellites** orbit at about **700 to 800 km** and are used for **remote sensing and weather**.
- **Sputnik 1** (USSR, **1957**) was the first artificial satellite. **Yuri Gagarin** was the first human in space (**1961**). **Valentina Tereshkova** was the first woman.
- **ISRO** was founded in **1969** (headquarters **Bengaluru**), after **INCOSPAR (1962)**; **Vikram Sarabhai** is the father of the Indian space programme.
- **Aryabhata** (**1975**) was India's first satellite. **Rakesh Sharma** was the first Indian in space (**1984**). **Kalpana Chawla** was the first Indian-origin woman in space.
- **Chandrayaan-1 (2008)** found water on the Moon; **Mangalyaan (Mars Orbiter Mission, 2013)** made India the first country to reach Mars orbit on its first try; **Aditya-L1 (2023)** studies the Sun; **Gaganyaan** is the human-spaceflight programme. Launch site: **Sriharikota**; rockets: **PSLV, GSLV, LVM3**.

:::tip Exam tip
**Hottest planet = Venus. Largest = Jupiter. Smallest = Mercury. Red planet = Mars. Densest planet = Earth. Least dense = Saturn.** **Solar eclipse at new moon; lunar at full moon.** **Biogas = mainly methane.** **Fusion = Sun; fission = nuclear reactor.** **Geostationary satellite: 36,000 km, 24 hours.**
:::

@unit Chemistry

## Matter and Separation of Mixtures {#matter}

### What is matter

**Matter** is anything that has **mass** and occupies **space**. Everything around us (air, water, wood, stone) is matter; **light, heat, sound and thoughts are not**. Matter is made of **particles** that are extremely small, have **spaces between them**, are **always moving**, and **attract each other**.

- **Diffusion:** particles of different substances mix on their own (smell of perfume, ink in water). It is **fastest in gases**, slowest in solids, and **increases with temperature**.
- **Brownian motion:** random zig-zag motion of tiny particles in a fluid, caused by bumping of fast-moving molecules (**Robert Brown**).

### States of matter

| Property | Solid | Liquid | Gas |
|---|---|---|---|
| **Shape** | Fixed | Takes the shape of the container | No fixed shape |
| **Volume** | Fixed | Fixed | Not fixed |
| **Compressibility** | Negligible | Very small | **High** |
| **Particle spacing** | Very close | Close | **Far apart** |
| **Attraction** | Strongest | Medium | Very weak |
| **Flow** | No | Yes | Yes |
| **Examples** | Ice, wood, iron | Water, milk, oil | Air, oxygen, steam |

- **Plasma** (ionised gas, the **fourth state**: Sun, stars, lightning, neon signs) and **Bose-Einstein condensate** (very near absolute zero) are other states.
- **LPG** is liquefied under pressure; **CNG** is compressed natural gas; **dry ice** is solid carbon dioxide (**sublimes**, no liquid stage).

### Changes of state

| Change | Name |
|---|---|
| Solid to liquid | **Melting (fusion)** |
| Liquid to solid | **Freezing (solidification)** |
| Liquid to gas | **Vaporisation (evaporation, boiling)** |
| Gas to liquid | **Condensation** |
| Solid to gas directly | **Sublimation** (camphor, naphthalene, ammonium chloride, iodine, dry ice) |
| Gas to solid directly | **Deposition** |

- **Melting point of ice = 0 C (273 K)**; **boiling point of water = 100 C (373 K)**.
- **Latent heat** is the heat absorbed at constant temperature during a change of state.
- **Evaporation** happens at **all temperatures**, only at the **surface**, and causes **cooling**. It rises with **higher temperature, larger surface, lower humidity and more wind**. **Boiling** happens at one fixed temperature, throughout the liquid.
- **Pressure raises the boiling point.** A **pressure cooker** cooks quickly; at **high altitude** water boils at a lower temperature.

### Physical and chemical change

| Physical change | Chemical change |
|---|---|
| No new substance is formed; usually reversible | A **new substance** forms; usually irreversible |
| Melting ice, dissolving salt, folding paper | **Rusting, burning, cooking, curdling of milk, souring, photosynthesis, digestion** |

Signs of a chemical change: **change of colour, gas released, heat or light, precipitate, change of smell**.

### Pure substances and mixtures

| Type | Meaning | Examples |
|---|---|---|
| **Element** | One kind of atom; cannot be broken further | **Iron, oxygen, gold, mercury, carbon** |
| **Compound** | **Two or more elements chemically combined** in a fixed ratio | Water, salt, sugar, CO₂ |
| **Mixture** | Two or more substances **physically** mixed; **no fixed ratio**; properties of components remain | Air, sea water, soil, alloys |

- **Homogeneous mixture:** uniform throughout (a **solution**): salt in water, air, brass, vinegar. **Heterogeneous mixture:** not uniform: sand and water, oil and water.
- **Alloys** are homogeneous mixtures of metals, e.g. **brass** (copper and zinc), **bronze** (copper and tin), **steel** (iron and carbon), **solder** (tin and lead), **stainless steel** (iron, chromium, nickel).
- **Element examples:** **gold, silver, copper, mercury (liquid metal), bromine (liquid non-metal)**; liquid at room temperature: **mercury, bromine** (also gallium and caesium on warm days).

### Solutions, suspensions and colloids

| Feature | Solution | Colloid | Suspension |
|---|---|---|---|
| **Particle size** | Smallest (below 1 nm) | 1 to 1000 nm | Larger than 1000 nm |
| **Appearance** | Clear, transparent | Cloudy; scatters light (**Tyndall effect**) | Opaque |
| **Settles on standing** | No | No | **Yes** |
| **Filtration** | Cannot separate | Cannot separate | **Separated** |
| **Examples** | Sugar in water, salt water | **Milk, blood, fog, smoke, jelly, ink, butter, cheese** | Muddy water, chalk in water |

- **Solute** is dissolved; **solvent** dissolves it. **Water is the universal solvent.**
- **Tyndall effect:** scattering of a light beam by colloidal particles (a **sunbeam through a dusty room**, headlights in fog).
- **Concentration** {{mass percent = (mass of solute / mass of solution) × 100}}.
- **Saturated solution:** cannot dissolve more solute at that temperature. **Solubility generally increases with temperature** for solids; **gases dissolve less** in warm water.

### Methods of separation

| Method | Used for | Example |
|---|---|---|
| **Handpicking** | Large impurities | Stones from rice |
| **Winnowing** | Light and heavy particles using wind | Grain from husk |
| **Threshing** | Grain from stalks | Wheat |
| **Sieving** | Different sizes | Flour from bran |
| **Sedimentation and decantation** | Insoluble heavier solid in liquid | Muddy water |
| **Filtration** | Insoluble solid from liquid | Tea leaves, water purification |
| **Evaporation** | Soluble solid from solution | **Salt from sea water** |
| **Crystallisation** | Pure crystals from solution | **Sugar, alum, copper sulphate** |
| **Magnetic separation** | Magnetic from non-magnetic | Iron filings from sand |
| **Sublimation** | A sublimable solid from a mixture | **Ammonium chloride** from salt |
| **Centrifugation** | Tiny suspended particles | **Cream from milk**, blood cells |
| **Separating funnel** | Two **immiscible** liquids | **Oil and water** |
| **Simple distillation** | Liquid from a dissolved solid | Pure water from salt water |
| **Fractional distillation** | Liquids with **close boiling points** | **Air gases, petroleum, alcohol and water** |
| **Chromatography** | Dyes and pigments | **Ink colours**, plant pigments |
| **Loading** (adding alum) | Fine suspended clay | Water purification |

**Purification of drinking water:** sedimentation, filtration, **chlorination** (kills germs), boiling and **UV or RO**.

:::tip Exam tip
**Mercury and bromine are the liquids among elements.** **Dry ice sublimes.** **Evaporation cools; it happens at all temperatures.** **Milk, blood, smoke and fog are colloids.** **Alloys are mixtures.** **Fractional distillation separates close boiling liquids.**
:::

## Atoms, Molecules and Atomic Structure {#atoms}

### Laws of chemical combination

| Law | Statement | Scientist |
|---|---|---|
| **Conservation of mass** | Mass is neither created nor destroyed in a chemical reaction | **Lavoisier** |
| **Constant (definite) proportions** | A compound always has the **same elements in the same mass ratio** (water: H and O in 1 : 8) | **Proust** |
| **Law of multiple proportions** | Different compounds of the same elements combine in simple whole-number ratios | **Dalton** |

### Dalton's atomic theory

- All matter is made of **atoms**, which are **indivisible**.
- Atoms of one element are **identical**; those of different elements differ.
- Atoms **combine in simple whole-number ratios** to form compounds.
- Atoms are **neither created nor destroyed** in a reaction.
- **Limitation:** atoms are **divisible** (into electrons, protons, neutrons) and **isotopes** of an element have different masses.

### Atoms, molecules and ions

- **Atom:** the smallest particle of an element that takes part in a reaction. **Molecule:** a group of atoms bonded together (**O₂, H₂O, CO₂**).
- **Atomicity** is the number of atoms in a molecule: **monatomic** (He, Ne, Ar), **diatomic** (H₂, N₂, O₂, Cl₂), **triatomic** (O₃ ozone, CO₂), **tetratomic** (P₄), **octatomic** (S₈).
- **Ion:** a charged particle. **Cation** is positive (lost electrons, e.g. Na⁺); **anion** is negative (gained electrons, e.g. Cl⁻).
- **Symbols:** often the first letter or two (H, He, Ca), or from Latin: **Na** (natrium, sodium), **K** (kalium, potassium), **Fe** (ferrum, iron), **Cu** (cuprum, copper), **Ag** (argentum, silver), **Au** (aurum, gold), **Pb** (plumbum, lead), **Hg** (hydrargyrum, mercury), **Sn** (stannum, tin), **Sb** (stibium, antimony), **W** (wolfram, tungsten).
- **Most abundant elements:** in the **Earth's crust: oxygen**, then silicon, aluminium, iron; in the **universe: hydrogen**; in the **human body: oxygen**; in the **atmosphere: nitrogen**. The **most abundant metal in the crust is aluminium**.
- **Atomic mass unit (u):** 1/12 of the mass of a **carbon-12** atom.

### Mole concept

- **Mole:** the amount of substance containing **6.022 × 10²³** particles (**Avogadro's number**).
- **Molar mass** is the mass of one mole in grams. **Moles = given mass / molar mass.**
- **1 mole of any gas at STP occupies 22.4 litres.**
- Example: 1 mole of water = 18 g = 6.022 × 10²³ molecules. **Molecular mass of CO₂ = 12 + 32 = 44 u.**

### Discovery of subatomic particles

| Particle | Charge | Mass | Discoverer | Location |
|---|---|---|---|---|
| **Electron (e-)** | Negative (-1) | Very small (1/1836 of a proton) | **J. J. Thomson** (1897) | Outside the nucleus |
| **Proton (p+)** | Positive (+1) | 1 u | **Goldstein** (canal rays), named by **Rutherford** | **Nucleus** |
| **Neutron (n)** | **Neutral** | 1 u | **James Chadwick** (1932) | **Nucleus** |

### Atomic models

| Model | Idea | Limitation |
|---|---|---|
| **Thomson (plum pudding)** | Positive sphere with electrons embedded | Could not explain scattering results |
| **Rutherford (nuclear model)** | **Alpha-scattering experiment** on gold foil: a small, dense, **positively charged nucleus** with electrons around it; most of the atom is **empty space** | Did not explain **stability** of the atom |
| **Bohr** | Electrons revolve in **fixed orbits (shells) without radiating energy**; energy is **quantised** | Fails for larger atoms |

- **Shells:** K, L, M, N (n = 1, 2, 3, 4). **Maximum electrons in a shell = 2n²**: K = 2, L = 8, M = 18, N = 32. The **outermost shell holds at most 8** electrons (the **octet rule**; **duplet** for first shell).
- **Valence electrons** are those in the outermost shell. **Valency** is the combining capacity: it equals the number of valence electrons (up to 4), otherwise **8 minus valence electrons**.
- **Examples:** Na (2,8,1) valency 1; Mg (2,8,2) valency 2; Al (2,8,3) valency 3; Cl (2,8,7) valency 1; Ne (2,8) **zero** (inert).

### Atomic number, mass number, isotopes

- **Atomic number (Z)** = number of **protons** (= electrons in a neutral atom).
- **Mass number (A)** = **protons + neutrons**. **Neutrons = A - Z.**
- **Isotopes:** atoms of the **same element with the same atomic number but different mass numbers**. Same chemical properties. Examples: **protium, deuterium, tritium** (hydrogen); **carbon-12 and carbon-14**; **chlorine-35 and 37**; **uranium-235**.
- **Uses:** **Uranium-235** (nuclear fuel), **cobalt-60** (cancer treatment), **iodine-131** (thyroid), **carbon-14** (dating of fossils).
- **Isobars:** same mass number, different atomic number (Ar-40 and Ca-40). **Isotones:** same neutron number.
- **Hydrogen has no neutron** in its common form.

:::tip Exam tip
**Electron: Thomson; proton: Goldstein/Rutherford; neutron: Chadwick.** **Rutherford: nucleus (gold foil).** **Max electrons = 2n².** **Mass number = protons + neutrons.** **Isotopes: same Z, different A.** **Na = natrium, K = kalium, Fe = ferrum, Pb = plumbum.**
:::

## Periodic Table and Periodic Properties {#periodic-table}

### Development of the table

| Scientist | Contribution |
|---|---|
| **Dobereiner** | **Triads** (groups of three elements with similar properties; middle element's mass is the average) |
| **Newlands** | **Law of Octaves** (every eighth element repeats), worked only up to calcium |
| **Mendeleev** (1869) | Arranged elements by **increasing atomic mass**; left gaps and predicted **eka-aluminium (gallium), eka-silicon (germanium)** and eka-boron (scandium) |
| **Moseley** (1913) | Showed that **atomic number** is the true basis |

**Modern periodic law:** properties of elements are a periodic function of their **atomic numbers**.

### Structure of the modern table

- **18 groups** (vertical columns) and **7 periods** (horizontal rows).
- **Elements in a group** have the **same number of valence electrons** and similar properties. **Elements in a period** have the **same number of shells**.
- **Blocks:** **s-block** (groups 1, 2), **p-block** (groups 13 to 18), **d-block** (groups 3 to 12, **transition metals**), **f-block** (lanthanides and actinides, placed at the bottom).
- **Number of elements** in the periods: 2, 8, 8, 18, 18, 32, 32 (the first has 2).
- **Total elements known: 118.**

| Group | Name | Features |
|---|---|---|
| **1** | **Alkali metals** | Li, Na, K, Rb, Cs, Fr; very reactive; **stored under kerosene** |
| **2** | **Alkaline earth metals** | Be, Mg, Ca, Sr, Ba, Ra |
| **17** | **Halogens** | F, Cl, Br, I, At; **salt-formers**; very reactive non-metals |
| **18** | **Noble (inert) gases** | He, Ne, Ar, Kr, Xe, Rn; **complete outermost shell**, very unreactive |

- **Hydrogen** is placed in group 1 but is a non-metal.
- **Metalloids (semi-metals):** **boron, silicon, germanium, arsenic, antimony, tellurium**; between metals and non-metals; **silicon and germanium are semiconductors**.

### Trends in the table

| Property | Across a period (left to right) | Down a group |
|---|---|---|
| **Atomic size** | **Decreases** | **Increases** |
| **Metallic character** | Decreases | **Increases** |
| **Non-metallic character** | Increases | Decreases |
| **Electronegativity** | Increases | Decreases |
| **Ionisation energy** | Increases | Decreases |
| **Valency** | Rises then falls (1 to 4, then 3 to 0) | Same |

- **Most metallic (reactive) metal:** **francium** (caesium is the most reactive stable one). **Most non-metallic:** **fluorine**, also the **most electronegative**.
- **Smallest atom:** **hydrogen** (helium by radius).
- **Reactivity:** metals become **more reactive down a group**; non-metals become **less reactive down a group**.
- **Atoms lose or gain electrons** to reach a **noble gas configuration**.

### Some important elements

- **Liquid at room temperature:** **mercury** (metal), **bromine** (non-metal).
- **Hardest natural substance:** **diamond** (carbon). **Best conductor of heat and electricity:** **silver**. **Lightest metal:** **lithium**. **Heaviest (densest) element:** **osmium**. **Lightest element:** **hydrogen**. **Highest melting point metal:** **tungsten**. **Most abundant gas in air:** **nitrogen**. **Most abundant element in the Sun:** hydrogen.
- **Radioactive elements:** **uranium, thorium, radium, polonium, radon**.
- **Noble gases:** **helium** in balloons and airships (**non-flammable**); **neon** in advertising signs; **argon** in bulbs; **xenon** in flash lamps; **radon** is radioactive.
- **Naming of elements**, such as **einsteinium, curium, mendelevium, nobelium**, honour scientists.

:::tip Exam tip
**Atomic size decreases across a period and increases down a group.** **Metallic character increases down a group.** **Fluorine: most electronegative.** **Mendeleev used atomic mass; modern table uses atomic number.** **Groups = 18, periods = 7.** **Same group = same valence electrons.**
:::

## Chemical Reactions and Equations {#reactions}

### Writing equations

A **chemical equation** shows reactants and products using symbols and formulae. It must be **balanced**, because **mass is conserved**: the number of atoms of each element is equal on both sides.

- **Physical states:** (s) solid, (l) liquid, (g) gas, (aq) aqueous solution. An **upward arrow** shows a gas released; a **downward arrow** a precipitate.
- Example: {{2H₂ + O₂ -> 2H₂O}}.
- A **catalyst** speeds up a reaction without being used up; **enzymes** are biological catalysts.

### Types of chemical reactions

| Type | Description | Example |
|---|---|---|
| **Combination** | Two or more substances form one product | {{CaO + H₂O -> Ca(OH)₂}} (slaking of lime); {{C + O₂ -> CO₂}} |
| **Decomposition** | One substance breaks into simpler ones | {{CaCO₃ -> CaO + CO₂}} (heat); {{2H₂O -> 2H₂ + O₂}} (electricity) |
| **Displacement** | A more reactive element displaces a less reactive one | {{Fe + CuSO₄ -> FeSO₄ + Cu}} |
| **Double displacement** | Exchange of ions; often a **precipitate** | {{Na₂SO₄ + BaCl₂ -> BaSO₄ + 2NaCl}} |
| **Oxidation** | Gain of oxygen or loss of hydrogen / electrons | Burning of magnesium |
| **Reduction** | Loss of oxygen or gain of hydrogen / electrons | {{CuO + H₂ -> Cu + H₂O}} |
| **Redox** | Oxidation and reduction together | Most reactions above |

- **Exothermic reactions release heat:** burning of fuels, **respiration**, **neutralisation**, slaking of lime, decomposition of vegetable matter into compost.
- **Endothermic reactions absorb heat:** **photosynthesis**, decomposition of calcium carbonate, **dissolving ammonium chloride**.
- **Thermal decomposition:** by heat. **Electrolysis:** by electricity (water splits into hydrogen at the **cathode** and oxygen at the **anode**, in ratio **2 : 1**). **Photolysis:** by light (**silver chloride darkens**, the basis of black-and-white photography).
- **Precipitation reaction:** an insoluble solid forms, e.g. **barium sulphate** (white), **lead iodide** (yellow).
- **Oxidising agent** gets reduced; **reducing agent** gets oxidised.

### Corrosion and rancidity

- **Corrosion** is the slow destruction of metals by air and moisture. **Rusting of iron** needs **both oxygen and water**: {{Fe₂O₃·xH₂O}}. **Silver tarnishes** (black silver sulphide) and **copper turns green** (basic copper carbonate).
- **Prevention of rusting:** **painting, oiling, galvanisation** (zinc coating), **tinning, electroplating, alloying (stainless steel), cathodic protection**.
- **Rancidity:** oxidation of fats and oils in food, giving a bad smell and taste. **Prevented** by **antioxidants**, airtight containers, refrigeration, and flushing **nitrogen** in chips packets.

:::tip Exam tip
**Rusting needs oxygen and water.** **Photosynthesis, dissolving NH₄Cl and CaCO₃ decomposition are endothermic.** **Respiration is exothermic.** **Electrolysis of water: H₂ : O₂ = 2 : 1.** **Galvanisation = zinc coating.** **Silver chloride is photosensitive.**
:::

## Acids, Bases and Salts {#acids-bases}

### Acids and bases

| Property | Acids | Bases |
|---|---|---|
| **Taste** | **Sour** | **Bitter**, soapy to touch |
| **Litmus** | **Blue to red** | **Red to blue** |
| **Ions** | Release **H⁺** in water | Release **OH⁻** in water |
| **pH** | **Below 7** | **Above 7** |
| **Phenolphthalein** | Colourless | **Pink** |
| **Methyl orange** | **Red** | **Yellow** |
| **Examples** | HCl, H₂SO₄, HNO₃, vinegar | **NaOH, KOH, Ca(OH)₂, NH₄OH, milk of magnesia** |

- **Indicators:** **litmus** (from lichens), **turmeric** (turns red with bases), **China rose (gudhal)**, **red cabbage**, **phenolphthalein**, **methyl orange**. **Olfactory indicators** (onion, vanilla, clove) change smell.
- **Alkali:** a base **soluble in water** (NaOH, KOH). All alkalis are bases, but **not all bases are alkalis** (copper oxide).
- **Strong acids:** HCl, H₂SO₄, HNO₃. **Weak acids:** acetic acid, carbonic acid, citric acid. **Strong bases:** NaOH, KOH.
- **Concentrated acid should be added to water slowly**, never the reverse (heat is released).

### Reactions

- **Acid + metal -> salt + hydrogen** (pops with a lighted splinter): {{Zn + H₂SO₄ -> ZₙSO₄ + H₂}}.
- **Acid + metal carbonate or bicarbonate -> salt + water + CO₂** (turns **lime water milky**): {{CaCO₃ + 2HCl -> CaCl₂ + H₂O + CO₂}}.
- **Acid + base -> salt + water** (**neutralisation**): {{HCl + NaOH -> NaCl + H₂O}}.
- **Acid + metal oxide -> salt + water**; **base + non-metal oxide -> salt + water** (so non-metal oxides are acidic and metal oxides are basic).
- **Acids and bases conduct electricity** in water because of ions.
- **Dilution** reduces the concentration of ions per unit volume.

### The pH scale

- **pH** (**S. P. L. Sorensen**) measures the **hydrogen-ion concentration**: **0 to 14**. **7 = neutral**; below 7 is acidic; above 7 is basic. **Each unit is ten times** in concentration. A **universal indicator** gives colours for the pH.
- **Common pH values:** **gastric juice 1.5 to 3**, **lemon juice about 2.2**, **vinegar about 3**, **tomato about 4**, **black coffee about 5**, **milk about 6.5**, **pure water 7**, **blood about 7.4**, **sea water about 8**, **baking soda about 8.3**, **milk of magnesia about 10**, **household ammonia about 11**, **sodium hydroxide about 14**.
- **Acid rain** has pH below **5.6**. **Tooth decay** begins when pH in the mouth falls below **5.5**; toothpaste (basic) neutralises acid.
- **Antacids** (**milk of magnesia, sodium bicarbonate**) neutralise excess **stomach acid (HCl)**.
- **Ant and nettle stings** contain **methanoic (formic) acid**; rub **baking soda** or **calamine**.
- **Soil pH:** lime is added to acidic soil; **organic manure** to alkaline soil.

### Acids in daily life

| Acid | Found in |
|---|---|
| **Citric acid** | Lemon, orange |
| **Acetic acid** | Vinegar |
| **Lactic acid** | Sour milk, curd |
| **Tartaric acid** | Grapes, tamarind, baking powder |
| **Oxalic acid** | Spinach, tomato |
| **Malic acid** | Apple |
| **Formic acid** | Ant sting |
| **Hydrochloric acid** | Stomach |
| **Carbonic acid** | Soda water, soft drinks |
| **Ascorbic acid** | **Vitamin C** |
| **Tannic acid** | Tea |
| **Sulphuric acid** | **"King of chemicals"**; car batteries |
| **Nitric acid** | Fertilisers, explosives |

**Aqua regia** (3 parts HCl : 1 part HNO₃) dissolves **gold and platinum**.

### Important salts

| Compound | Formula | Preparation and uses |
|---|---|---|
| **Common salt** | NaCl | From sea water and rock salt; food, preservative |
| **Caustic soda** | NaOH | **Chlor-alkali process** (electrolysis of brine, giving **Cl₂, H₂ and NaOH**); soaps, paper |
| **Bleaching powder** | CaOCl₂ | {{Ca(OH)₂ + Cl₂}}; **disinfecting water, bleaching** |
| **Baking soda** | NaHCO₃ | Mild antacid; baking (CO₂ makes dough rise); **fire extinguisher** |
| **Washing soda** | Na₂CO₃.10H₂O | Removes **permanent hardness** of water; cleaning |
| **Plaster of Paris** | CaSO₄·½H₂O | **Gypsum heated at 373 K**; **fracture supports**, statues; sets into gypsum with water |
| **Gypsum** | CaSO₄·2H₂O | Cement; fertiliser |
| **Quicklime** | CaO | Cement, drying; **slaked lime** is Ca(OH)₂ |
| **Limestone, marble, chalk** | CaCO₃ | Building |
| **Blue vitriol** | CuSO₄·5H₂O | Pesticide, **Bordeaux mixture**; **blue** crystals turn **white** on heating |
| **Green vitriol** | FeSO₄·7H₂O | Medicine |

- **Water of crystallisation** is the fixed number of water molecules in a salt crystal.
- **Salts of strong acid + strong base** are **neutral** (pH 7); **strong acid + weak base** are **acidic**; **weak acid + strong base** are **basic** (washing soda pH about 11).
- **Hard water** has dissolved **calcium and magnesium salts**; it does not lather well. **Temporary hardness** (bicarbonates) is removed by **boiling**; **permanent hardness** (chlorides, sulphates) by **washing soda or ion-exchange**.
- **Baking powder** = baking soda + a mild edible acid (tartaric acid).

:::tip Exam tip
**pH < 7 acid; > 7 base; blood 7.4.** **Baking soda = NaHCO₃; washing soda = Na₂CO₃.** **Plaster of Paris = CaSO₄·½H₂O.** **Chlor-alkali gives Cl₂, H₂, NaOH.** **Lime water turns milky with CO₂.** **Aqua regia dissolves gold.** **Add acid to water, not water to acid.**
:::

## Metals and Non-metals {#metals}

### Properties

| Property | Metals | Non-metals |
|---|---|---|
| **Lustre** | Shiny | Dull (iodine and graphite shine) |
| **Hardness** | Hard (sodium and potassium are soft) | Soft (diamond is hardest) |
| **Malleability and ductility** | **Yes** (gold and silver most) | **Brittle** |
| **Conduction** | **Good conductors** | **Poor** (graphite conducts) |
| **Sonority** | Yes | No |
| **Melting point** | Usually high (**gallium, caesium** melt in the hand) | Low |
| **Oxides** | **Basic** (some **amphoteric**) | **Acidic** |
| **State** | Solid (**mercury** liquid) | Solid, liquid (**bromine**), gas |
| **Ions** | Form **cations** | Form **anions** |
| **Density** | High (**sodium, potassium, lithium** float on water) | Low |

- **Amphoteric oxides** react with both acids and bases: **Al₂O₃, ZnO**.
- **Malleable:** can be beaten into sheets. **Ductile:** can be drawn into wires. **Most malleable and ductile: gold.** **Best conductors: silver, then copper**; **lead is a poor conductor**.
- **Sodium and potassium** are kept in **kerosene** (they catch fire in air). **Phosphorus** is stored under **water**.

### Reactions of metals

- **With oxygen:** metal oxides (basic). **Magnesium burns with a dazzling white flame.** **Aluminium forms a protective oxide layer.**
- **With water:** **sodium and potassium react violently**; magnesium with hot water; iron with steam; **copper, silver, gold do not react**.
- **With dilute acids:** release hydrogen (except copper, silver, gold).
- **Displacement:** a more reactive metal replaces a less reactive one from its salt.

### Reactivity series

**Potassium > Sodium > Calcium > Magnesium > Aluminium > Zinc > Iron > Tin > Lead > (Hydrogen) > Copper > Mercury > Silver > Gold** (most to least reactive).

:::mem Memory trick
**"Please Stop Calling Me A Zebra, Instead Try Learning How Copper Saves Gold"** : **P**otassium, **S**odium, **C**alcium, **M**agnesium, **A**luminium, **Z**inc, **I**ron, **T**in, **L**ead, **H**ydrogen, **C**opper, **S**ilver, **G**old.
:::

### Ionic compounds

- Formed by **transfer of electrons** from a metal to a non-metal (e.g. **NaCl**).
- **Properties:** **solids, hard and brittle**, **high melting and boiling points**, **soluble in water**, **conduct electricity when molten or dissolved** (not in the solid state).

### Occurrence and extraction

- **Mineral:** a natural substance containing metals. **Ore:** a mineral from which the metal can be **extracted profitably**. **Gangue** is the earth impurity.
- **Metallurgy** is the whole process: **concentration, extraction (reduction), refining**.

| Metal reactivity | Method | Example |
|---|---|---|
| **High (K, Na, Ca, Mg, Al)** | **Electrolysis** of molten compound | **Aluminium from bauxite (Al₂O₃)**, sodium from molten NaCl |
| **Medium (Zn, Fe, Pb)** | Roast / calcine then **reduction with carbon** | **Zinc, iron** |
| **Low (Cu, Hg, Ag, Au)** | **Heating** the ore | **Cinnabar (HgS) gives mercury** |

- **Roasting:** heating a **sulphide ore** in excess air. **Calcination:** heating a **carbonate ore** in limited air.
- **Thermite reaction:** aluminium reduces iron oxide, giving molten iron; used to **weld rail tracks**.
- **Electrolytic refining** gives pure **copper** (impure copper as anode, pure as cathode).
- **Ores:** **bauxite** (aluminium), **haematite** (iron), **cinnabar** (mercury), **galena** (lead), **zinc blende** (zinc), **copper pyrites** (copper), **magnetite** (iron), **malachite** (copper), **rutile** (titanium), **pitchblende** (uranium), **monazite** (thorium).
- **Corrosion** and **alloys** improve properties: **brass** (Cu + Zn), **bronze** (Cu + Sn), **steel** (Fe + C), **stainless steel**, **duralumin** (Al + Cu, light, aircraft), **solder** (Sn + Pb), **German silver** (Cu, Zn, Ni; no silver), **amalgam** (any alloy with mercury).

### Non-metals

- **Hydrogen, carbon, nitrogen, oxygen, sulphur, phosphorus, chlorine, iodine, bromine, fluorine** and the noble gases.
- **Allotropes of carbon:** **diamond** (hardest, insulator), **graphite** (conducts electricity, slippery, used in **pencils and lubricants**), **fullerene** (C-60, **buckminsterfullerene**).

:::tip Exam tip
**Gold is the most malleable and ductile; silver the best conductor.** **Sodium and potassium are kept in kerosene; phosphorus under water.** **Bauxite = aluminium.** **Reactivity: K > Na > Ca > Mg > Al > Zn > Fe.** **Ionic compounds conduct only when molten or dissolved.** **Roasting: sulphide; calcination: carbonate.**
:::

## Carbon and its Compounds {#carbon}

### Why carbon is special

- **Atomic number 6** (2, 4): **tetravalent** (valency 4). It forms **covalent bonds** by **sharing electrons**.
- **Catenation:** carbon atoms bond to each other to form long **chains, branches and rings**. **Tetravalency** and catenation give **millions of compounds**. Carbon forms **single, double and triple bonds**.
- **Covalent compounds:** **low melting and boiling points**, usually **non-conductors**, **soluble in organic solvents**.

### Allotropes of carbon

| Allotrope | Structure and properties |
|---|---|
| **Diamond** | Each carbon bonded to **four others**, a rigid 3-D lattice; **hardest natural substance**; **very high refractive index**; **poor conductor** |
| **Graphite** | Layers of **hexagons**; **soft, slippery**; **good conductor**; used in **pencils, electrodes and lubricants** (not lead) |
| **Fullerene** | **C-60**, football-shaped; found by **Kroto, Smalley, Curl** |
| **Graphene** | A **single layer** of graphite; very strong and conductive |
| **Charcoal, coke, lamp black** | Amorphous forms |

### Hydrocarbons

| Type | Bond | General formula | Examples |
|---|---|---|---|
| **Alkanes (saturated)** | All single | {{CₙH₂ₙ₊₂}} | **Methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀** |
| **Alkenes** | One double bond | {{CₙH₂ₙ}} | **Ethene C₂H₄, propene C₃H₆** |
| **Alkynes** | One triple bond | {{CₙH₂ₙ₋₂}} | **Ethyne C₂H₂** |

- **Saturated** hydrocarbons burn with a **clean blue flame**; **unsaturated** ones burn with a **yellow, sooty flame**.
- **Methane** is the main component of **natural gas, biogas and marsh gas**; **LPG** is propane and butane; **CNG** is mostly methane.
- **Homologous series:** a family of compounds with the **same functional group**, whose members **differ by a CH₂ unit** (mass difference **14 u**). **Properties change gradually.**
- **Functional group:** an atom or group that decides the compound's properties.

| Functional group | Name | Example |
|---|---|---|
| **-OH** | **Alcohol** | Methanol, **ethanol** |
| **-CHO** | **Aldehyde** | Methanal, ethanal |
| **>C=O** | **Ketone** | **Propanone (acetone)** |
| **-COOH** | **Carboxylic acid** | **Ethanoic (acetic) acid** |
| **Halogen (-Cl, -Br)** | Halo-alkane | Chloromethane |

**IUPAC naming:** prefix words **meth-, eth-, prop-, but-, pent-, hex-** (1 to 6 carbons); endings: **-ane** (alkane), **-ene** (alkene), **-yne** (alkyne), **-ol** (alcohol), **-al** (aldehyde), **-one** (ketone), **-oic acid** (carboxylic acid).
**Isomers** have the same molecular formula but different structures (butane and isobutane).

### Chemical properties

- **Combustion:** {{CH₄ + 2O₂ -> CO₂ + 2H₂O + heat}}. **Incomplete combustion** gives **carbon monoxide and soot**.
- **Oxidation:** ethanol is oxidised to ethanoic acid by **alkaline potassium permanganate** or **acidified potassium dichromate**.
- **Addition reaction:** unsaturated hydrocarbons add hydrogen in the presence of **nickel catalyst**, giving saturated ones. This is the basis of **hydrogenation of vegetable oil into vanaspati ghee**.
- **Substitution reaction:** a hydrogen atom is replaced (alkanes with chlorine in sunlight).

### Ethanol and ethanoic acid

| Property | Ethanol (C₂H₅OH) | Ethanoic acid (CH₃COOH) |
|---|---|---|
| **Nature** | Neutral liquid | **Weak acid** |
| **Uses** | **Medicines, tonics, alcoholic drinks, solvent, fuel (petrol blending)** | **Vinegar (5 to 8%)**, preservative |
| **Reactions** | With **sodium** gives **hydrogen**; **dehydration** with conc. H₂SO₄ gives **ethene** | Reacts with **carbonates** to release **CO₂**; with alcohol forms an **ester** (sweet smell) |

- **Denatured alcohol** is poisonous ethanol made unfit to drink (with **methanol** and a dye). **Methanol** is **poisonous**; it can cause **blindness and death**.
- **Pure ethanoic acid** freezes at **16.6 C** and is called **glacial acetic acid**.
- **Esterification:** acid + alcohol, in the presence of **concentrated sulphuric acid**, gives an **ester** + water. **Esters** smell fruity (perfumes, flavours).
- **Fermentation:** **yeast** converts sugar into ethanol and CO₂.

### Soaps and detergents

- **Soap:** **sodium or potassium salts of long-chain fatty acids**, made by **saponification** (fat or oil + NaOH). **Glycerol** is a by-product.
- **Micelle:** soap molecules have a **water-loving (hydrophilic) head** and an **oil-loving (hydrophobic) tail**; they form spherical **micelles** around dirt.
- **Soaps do not work well in hard water** (they form **scum**); **detergents** (sulphonate or sulphate salts) work in hard water. **Some detergents are not biodegradable** and pollute water.

:::tip Exam tip
**Carbon is tetravalent and shows catenation.** **Diamond is hardest; graphite conducts.** **CₙH₂ₙ₊₂ alkane; CₙH₂ₙ alkene; CₙH₂ₙ₋₂ alkyne.** **Hydrogenation of oils uses nickel.** **Soap + hard water = scum.** **Methanol is poisonous.** **-OH alcohol; -COOH acid; -CHO aldehyde.**
:::

## Everyday Chemistry: Water, Air, Fuels and Materials {#everyday-chemistry}

### Air

| Gas | Percentage by volume |
|---|---|
| **Nitrogen** | **78%** |
| **Oxygen** | **21%** |
| **Argon** | **0.93%** |
| **Carbon dioxide** | **0.04%** |
| Others (neon, helium, methane, water vapour) | Traces |

- **Oxygen** supports burning and respiration; **nitrogen** is inert and is fixed by bacteria and lightning; **CO₂** is used by plants, in **fire extinguishers**, soda water and **dry ice**.
- **Ozone (O₃):** in the **stratosphere** at 15 to 35 km; absorbs harmful **UV rays**. **CFCs** deplete it. **Montreal Protocol (1987)** controls this.
- **Greenhouse gases:** **CO₂, methane, water vapour, nitrous oxide, CFCs**. **Global warming** results from their increase.
- **Test for gases:** **CO₂ turns lime water milky**; **hydrogen burns with a pop**; **oxygen relights a glowing splinter**; **ammonia** has a pungent smell.

### Water

- **Formula H₂O**; two hydrogen atoms bonded to one oxygen. **Pure water has no taste, colour or smell**, and pH 7.
- **Heavy water (D₂O)** is used as a **moderator in nuclear reactors**.
- **Hard water** forms scum with soap; **soft water** lathers easily.
- **Water treatment:** sedimentation, filtration, **chlorination**; **ozone** and **UV** are also used.
- **Water pollution:** industrial effluents, sewage, **pesticides**; **eutrophication** is excess nutrients causing algal bloom. **BOD (biochemical oxygen demand)** measures pollution by organic waste.

### Combustion and fuels

- **Combustion** is burning in oxygen with heat and light. **Conditions for burning:** a **fuel, oxygen (air) and ignition temperature**. **Fire is extinguished** by removing any one: **water** (cools; not for oil or electrical fires), **CO₂** (cuts off oxygen; for electrical and oil fires), **sand or blanket**.
- **Types of combustion:** **rapid** (fire), **spontaneous** (white phosphorus), **explosive** (crackers).
- **Flame zones:** **innermost (dark, unburnt vapour)**, **middle (partial combustion, luminous)**, **outermost (complete combustion, hottest, non-luminous)**. **Goldsmiths use the outermost zone.**
- **Ignition temperature:** the lowest temperature at which a substance catches fire.
- **Coal:** from buried plants over millions of years (**carbonisation**). **Types:** **peat, lignite, bituminous, anthracite** (best, highest carbon). **Products:** **coke, coal tar, coal gas**. Coal tar yields benzene, naphthalene, phenol, used for **dyes, drugs, explosives, plastics, paints**.
- **Petroleum** (rock oil) is refined by **fractional distillation**: **petroleum gas (LPG)**, **petrol**, **kerosene**, **diesel**, **lubricating oil**, **paraffin wax**, **bitumen**. **Petrol is the most volatile; bitumen is the least.** **Octane rating** shows the quality of petrol.
- **Natural gas:** mainly **methane**; used as **CNG** and in fertiliser plants. **LPG** has a **foul-smelling ethyl mercaptan** added to detect leaks.
- **Biofuels:** **ethanol** and **biodiesel** (from jatropha and oils).

### Materials

| Material | Facts |
|---|---|
| **Natural fibres** | **Plant:** cotton, jute, flax. **Animal:** wool (sheep, goat, yak), **silk** (silkworm cocoon; sericulture) |
| **Synthetic fibres** | **Rayon** (artificial silk, from wood pulp, **semi-synthetic**), **nylon** (first fully synthetic; **parachutes, ropes, brushes**), **polyester** (**Terylene, PET**), **acrylic** (imitates wool) |
| **Plastics** | **Polymers** of long chains. **Thermoplastics** soften on heating (**polythene, PVC**); **thermosetting plastics** do not (**Bakelite**, melamine) |
| **Polythene** | Carry bags; **PVC** pipes; **Teflon** non-stick coating; **Bakelite** electric switches |
| **Glass** | Sand (silica) + soda + limestone; **coloured by metal oxides** |
| **Ceramics and cement** | **Cement** is made from **limestone and clay**; **gypsum** is added; **mortar** and **concrete** |
| **Rubber** | **Natural latex**; **vulcanisation** (heating with **sulphur**, by **Charles Goodyear**) makes it hard and elastic |

- **Biodegradable** materials decompose by microbes (paper, food); **non-biodegradable** ones (plastics, glass) do not. Use the **3 Rs: reduce, reuse, recycle**.
- **Fertilisers:** **urea** (46% N, the **highest nitrogen**), **NPK**, **DAP**, **superphosphate**; **pesticides** include insecticides, fungicides, herbicides. **DDT** is banned for its persistence.
- **Dyes, soaps, medicines:** **antibiotics** (penicillin, found by **Alexander Fleming**, 1928), **antipyretics** (paracetamol), **analgesics** (aspirin), **antacids**, **antiseptics** (dettol, iodine tincture), **disinfectants**.
- **Fire extinguishers:** soda-acid (baking soda + sulphuric acid, produces CO₂), foam, CO₂.
- **Preservation of food:** salt, sugar, oil, vinegar, **sodium benzoate**, cold storage, **pasteurisation** (heating milk at 70 C for 15 to 30 seconds, by **Louis Pasteur**).
- **Artificial sweeteners:** **saccharin, aspartame**.
- **LPG cylinders in India: 14.2 kg domestic.**
- **Tear gas** is chloropicrin; **laughing gas** is **nitrous oxide**; **marsh gas** is **methane**; **dry ice** is solid CO₂; **quicksilver** is mercury; **vitamin C** is **ascorbic acid**; **bleaching powder** is calcium oxychloride; **rock salt** is NaCl; **Epsom salt** is magnesium sulphate; **Glauber's salt** is sodium sulphate; **chile saltpetre** is NaNO₃.

:::tip Exam tip
**Air: N₂ 78%, O₂ 21%.** **Ozone absorbs UV; CFCs destroy it.** **Fire from oil or electricity: use CO₂, not water.** **Vulcanisation uses sulphur.** **Bakelite is thermosetting.** **Nylon is the first fully synthetic fibre.** **Urea has the highest nitrogen.** **Outermost flame zone is hottest.**
:::

@unit Biology

## Living World, Cell and Tissues {#cell-tissues}

### Characteristics of living things

Living things **grow, respire, need nutrition, respond to stimuli (irritability), reproduce, excrete, move and die**. **Metabolism** is the sum of all chemical reactions in the body. **Biology** was named by **Lamarck** and **Treviranus**; **Aristotle** is the **Father of Biology** and **Father of Zoology**; **Theophrastus** is the **Father of Botany**.

### Cell: the basic unit of life

- **Robert Hooke (1665)** saw the **cell** in a slice of **cork** and named it. **Anton van Leeuwenhoek** first saw **living cells** (bacteria, protozoa) with a simple microscope.
- **Cell theory** (**Schleiden** and **Schwann**, 1838 to 1839; extended by **Virchow**, 1855): **all living things are made of cells; the cell is the basic unit; new cells arise from existing cells.**
- **Robert Brown (1831)** discovered the **nucleus**. **Purkinje** named **protoplasm**.
- **Smallest cell:** **Mycoplasma** (PPLO). **Largest cell:** **ostrich egg**. **Longest cell:** **nerve cell (neuron)**. **Largest human cell: ovum**; **smallest: sperm**; **red blood cell** is among the smallest and lacks a nucleus.
- **Unicellular** organisms: amoeba, paramecium, bacteria, yeast. **Multicellular:** humans, plants.

### Prokaryotic and eukaryotic cells

| Feature | Prokaryotic | Eukaryotic |
|---|---|---|
| **Nucleus** | **No true nucleus** (nucleoid, no membrane) | **True nucleus** with a membrane |
| **Organelles** | No membrane-bound organelles | Present |
| **Size** | Small | Larger |
| **Examples** | **Bacteria, blue-green algae (cyanobacteria)** | **Plants, animals, fungi, protozoa** |

### Parts of the cell

| Part | Function |
|---|---|
| **Cell membrane (plasma membrane)** | **Selectively permeable**; controls entry and exit. In both plant and animal cells |
| **Cell wall** | **Only in plants, fungi, bacteria**; made of **cellulose** in plants; gives shape and protection |
| **Nucleus** | **Control centre**; contains **chromosomes** (DNA); **nucleolus** makes ribosomes |
| **Cytoplasm** | Jelly-like fluid where organelles lie |
| **Mitochondria** | **Powerhouse of the cell**; produce **ATP** by respiration; have **own DNA** |
| **Ribosomes** | Make **proteins** (the "protein factories") |
| **Endoplasmic reticulum (ER)** | **Rough ER** (with ribosomes) makes proteins; **smooth ER** makes **lipids and detoxifies** |
| **Golgi apparatus (Camillo Golgi)** | **Packages, modifies and dispatches** products; "post office" |
| **Lysosomes** | **"Suicide bags"**; digest waste and old cell parts |
| **Plastids** | **Plant cells only**. **Chloroplasts** (green, **photosynthesis**, contain chlorophyll), **chromoplasts** (colour), **leucoplasts** (store starch, oil, protein) |
| **Vacuole** | **Large in plants** (stores water, sap, maintains turgor); small in animals |
| **Centrosome (centrioles)** | **Animal cells**; help in **cell division** |

- **Differences:** plant cells have a **cell wall, plastids, a large central vacuole**; animal cells have **centrioles** and lysosomes (rare in plants).
- **Diffusion:** movement from higher to lower concentration. **Osmosis:** movement of **water** through a **semi-permeable membrane** from lower solute to higher solute concentration. **Raisins swell in water**.
- **Plasmolysis:** a plant cell shrinks in a strong salt solution; **hypotonic** (swells), **isotonic** (no change), **hypertonic** (shrinks).
- **Endocytosis** and **exocytosis** carry large particles in and out.
- **Chromosomes** (DNA with proteins) are seen during division. **Genes** are the units of heredity.
- **Cell division:** **mitosis** (growth and repair; **two identical cells**; chromosome number is the same) and **meiosis** (formation of **gametes**; **four cells with half the chromosomes**). **Humans have 46 chromosomes (23 pairs)**; gametes have 23.

### Plant tissues

| Tissue | Type | Function |
|---|---|---|
| **Meristematic** | Apical (tips), lateral (girth), intercalary (base of leaves) | **Cells keep dividing**, causing growth |
| **Permanent: simple** | **Parenchyma** (storage), **collenchyma** (flexibility), **sclerenchyma** (hard, **husk of coconut**, lignin) | Support and storage |
| **Complex permanent** | **Xylem** (water and minerals **upward**; vessels, tracheids), **phloem** (**food downward**; sieve tubes, companion cells) | **Conduction** (vascular tissue) |
| **Protective** | **Epidermis** with **stomata**, **cork** (dead, **suberin**) | Protection, gas exchange |

- **Stomata** open and close through **guard cells**; they are for **gas exchange and transpiration**.
- **Xylem** and **sclerenchyma** are **dead** tissues (mostly).

### Animal tissues

| Tissue | Types and examples | Function |
|---|---|---|
| **Epithelial** | Squamous (skin, lining of mouth and blood vessels), cuboidal (kidney tubules), columnar (intestine), ciliated (windpipe) | Covering and protection |
| **Connective** | **Blood**, **bone**, **cartilage**, **tendon** (muscle to bone), **ligament** (bone to bone), **adipose (fat)**, areolar | Support, binding, transport |
| **Muscular** | **Striated (skeletal, voluntary)**, **smooth (involuntary: gut, blood vessels)**, **cardiac (heart, involuntary, striated)** | Movement |
| **Nervous** | **Neurons** | Receive and conduct impulses |

- **Blood** is a **fluid connective tissue**. **Cartilage** is in the nose, ear and joints. **Bone** is the hardest tissue (calcium phosphate).
- **Cardiac muscle** never tires; **smooth muscles** are **involuntary**.

:::tip Exam tip
**Mitochondria: powerhouse. Lysosome: suicide bag. Ribosome: protein. Chloroplast: only plant cells.** **Hooke: cell (cork); Brown: nucleus.** **Xylem up, phloem down.** **Ligament joins bone to bone; tendon, muscle to bone.** **Cell membrane is selectively permeable.** **Humans have 46 chromosomes.**
:::

## Classification and Diversity of Life {#diversity}

### Why classify

Classification groups organisms by similarity. **Carolus Linnaeus** (**Father of Taxonomy**) gave the **binomial nomenclature** system: every organism has a **genus name** (capitalised) and a **species name** (small), e.g. **Homo sapiens**, **Mangifera indica** (mango), **Panthera leo** (lion).

- **Hierarchy:** **Kingdom, Phylum (Division in plants), Class, Order, Family, Genus, Species.**
- **Five-kingdom classification** (**R. H. Whittaker**, 1969): **Monera, Protista, Fungi, Plantae, Animalia**.
- **Carl Woese** proposed **three domains** (Bacteria, Archaea, Eukarya).

| Kingdom | Features | Examples |
|---|---|---|
| **Monera** | **Prokaryotes**, unicellular | **Bacteria, cyanobacteria** |
| **Protista** | Unicellular **eukaryotes** | **Amoeba, paramecium, euglena, diatoms** |
| **Fungi** | **Heterotrophs**, cell walls of **chitin**, decompose and absorb | **Yeast, mushroom, penicillium, mould** |
| **Plantae** | **Autotrophs**, cell wall of cellulose | All plants |
| **Animalia** | **Heterotrophs**, no cell wall, multicellular | All animals |

### Plant kingdom

| Group | Features | Examples |
|---|---|---|
| **Thallophyta (algae)** | No differentiated body; mostly aquatic | **Spirogyra, Ulothrix, Chara** |
| **Bryophyta** | **Amphibians of the plant kingdom**; moist places; no vascular tissue | **Moss (Funaria), liverwort (Marchantia)** |
| **Pteridophyta** | Vascular tissue, **no seeds or flowers** | **Ferns, Marsilea, horsetails** |
| **Gymnosperms** | **Naked seeds**, no fruits; cones | **Pine, deodar, cycas, spruce** |
| **Angiosperms** | **Flowering, seeds enclosed in fruits** | Mango, wheat, rose |

**Angiosperms** are of two types:

| Monocot | Dicot |
|---|---|
| **One cotyledon** | **Two cotyledons** |
| **Parallel venation**, **fibrous roots** | **Reticulate venation**, **tap roots** |
| Wheat, rice, maize, grass, onion | Pea, gram, mango, mustard |
| Flower parts in **threes** | In **fours or fives** |

### Animal kingdom

| Phylum / group | Features | Examples |
|---|---|---|
| **Porifera** | **Pore-bearing**, sessile, cellular level | **Sponges (Sycon)** |
| **Coelenterata (Cnidaria)** | Stinging cells, tentacles, **radial symmetry** | **Hydra, jellyfish, sea anemone, coral** |
| **Platyhelminthes** | **Flatworms**, no body cavity | **Tapeworm, liver fluke, planaria** |
| **Nematoda** | **Roundworms** | **Ascaris, filaria, hookworm** |
| **Annelida** | **Segmented** body | **Earthworm, leech, nereis** |
| **Arthropoda** | **Largest phylum**; jointed legs, chitin exoskeleton | **Insects, spiders, prawn, crab, scorpion, centipede** |
| **Mollusca** | Soft body, usually a shell | **Snail, octopus, squid, pearl oyster** |
| **Echinodermata** | **Spiny skin**, marine | **Starfish, sea urchin** |
| **Chordata** | **Notochord**, dorsal nerve cord, gill slits | Vertebrates |

**Vertebrates (backbone):**

| Class | Features | Examples |
|---|---|---|
| **Pisces (fishes)** | Gills, **cold-blooded**, 2-chambered heart, scales | **Shark, rohu, seahorse, torpedo** |
| **Amphibia** | Live on **land and water**; 3-chambered heart; moist skin | **Frog, toad, salamander** |
| **Reptilia** | Dry scaly skin, lay eggs on land; most have 3-chambered heart (**crocodile has 4**) | **Snake, lizard, turtle, crocodile** |
| **Aves (birds)** | **Warm-blooded**, feathers, **4-chambered heart**, hollow bones, lay eggs | **Crow, ostrich, penguin, kiwi** |
| **Mammalia** | **Warm-blooded**, **mammary glands**, hair, **4-chambered heart**, mostly bear young | **Humans, bat, whale, dolphin** |

- **Egg-laying mammals:** **platypus and echidna**. **Marsupials** carry young in a pouch (**kangaroo**). **Bats** are the only flying mammals; **whales and dolphins** are aquatic mammals.
- **Cold-blooded (poikilotherms):** fishes, amphibians, reptiles. **Warm-blooded (homeotherms):** birds and mammals.

### Microorganisms

- **Bacteria, viruses, fungi, protozoa and algae** are microorganisms. **Viruses** are **non-cellular**, living only inside host cells; **bacteriophages** attack bacteria.
- **Useful uses:** **curd (Lactobacillus)**, **bread, cakes, alcohol and fermentation (yeast)**, **antibiotics (penicillin from Penicillium)**, **vaccines**, **nitrogen fixation (Rhizobium in legume roots; Azotobacter; blue-green algae)**, **decomposers**, **sewage treatment**.
- **Harmful:** diseases, food spoilage, crop diseases.
- **Edward Jenner** (smallpox vaccine, 1796); **Louis Pasteur** (germ theory, rabies vaccine); **Robert Koch** (TB and cholera bacteria, **Koch's postulates**); **Alexander Fleming** (penicillin); **Ronald Ross** (malaria parasite in mosquito).

:::tip Exam tip
**Linnaeus: binomial nomenclature, Father of Taxonomy.** **Whittaker: five kingdoms.** **Bryophytes: amphibians of plant kingdom.** **Gymnosperm: naked seed.** **Monocots: parallel venation.** **Arthropoda: largest phylum.** **Crocodile: 4-chambered heart.** **Platypus lays eggs.** **Fungi: chitin.**
:::

## Plant Life: Nutrition, Photosynthesis and Transport {#plants}

### Parts of a plant

| Part | Function |
|---|---|
| **Root** | Anchors; absorbs water and minerals. **Tap root** (dicots), **fibrous root** (monocots). **Root hairs** absorb. **Modified roots:** **carrot, radish, turnip (tap)**; **sweet potato**; **banyan prop roots**; **pneumatophores (mangroves)** |
| **Stem** | Supports; conducts. **Modified stems:** **potato (tuber), ginger (rhizome), onion (bulb), sugarcane, runners** |
| **Leaf** | Photosynthesis, transpiration. **Venation** parallel or reticulate |
| **Flower** | Reproduction |
| **Fruit and seed** | Dispersal and new plants |

### Photosynthesis

Plants (and algae, some bacteria) make food using **sunlight, water, and carbon dioxide** with **chlorophyll**:

{{6CO₂ + 6H₂O + sunlight -> C₆H₁₂O₆ + 6O₂}}

- **Site:** **chloroplasts** (in the **leaf**). **Chlorophyll** absorbs **red and blue** light and **reflects green**.
- **Water** is taken through **roots** (xylem); **CO₂** enters through **stomata**.
- **Products:** **glucose (stored as starch)** and **oxygen**. **Oxygen released comes from water.**
- **Starch test:** **iodine** turns **blue-black** with starch (used to show photosynthesis in the leaf).
- **Light and dark reactions:** light reactions give ATP and release O₂; **Calvin cycle** (dark reaction) makes glucose.
- **Conditions:** light, chlorophyll, CO₂, water.
- **Plants that lack chlorophyll** (fungi, **Cuscuta (amar bel)**) cannot do photosynthesis.

### Modes of nutrition

| Mode | Meaning | Examples |
|---|---|---|
| **Autotrophic** | Make their own food | Green plants, algae |
| **Heterotrophic** | Depend on others | Animals, fungi |
| **Parasitic** | Feed on a living host | **Cuscuta, tapeworm, lice, Plasmodium, Ascaris** |
| **Saprotrophic** | Feed on **dead and decaying** matter | **Fungi (bread mould), bacteria, mushrooms** |
| **Symbiotic** | Both benefit | **Lichens** (algae + fungus), **Rhizobium** in legumes |
| **Insectivorous** | Plants that **trap insects** for nitrogen | **Pitcher plant, venus flytrap, sundew, bladderwort** |
| **Holozoic** | Animals take in solid food (digest internally) | Humans, amoeba |

- **Nitrogen cycle** and **nitrogen fixation:** **Rhizobium** (in root nodules of **pulses**, e.g. gram, pea), **Azotobacter**, **blue-green algae** and **lightning**.
- **Minerals needed:** **macro** (N, P, K, Ca, Mg, S) and **micro** (Fe, Zn, Cu, Mn, B, Mo). **Magnesium** is a part of chlorophyll; **nitrogen** in proteins and chlorophyll. **Deficiency** of **nitrogen causes yellowing (chlorosis)**.
- **Hydroponics:** growing plants in a **nutrient solution** without soil.

### Transport in plants

- **Water and minerals** go up through **xylem**: driven by **transpiration pull** and **root pressure**.
- **Transpiration:** loss of water vapour from leaves through **stomata**. It **cools** the plant and pulls water up. **Stomata close at night** (in most plants).
- **Phloem** carries **sucrose, amino acids** from leaves to other parts in **both directions**: **translocation**.
- **Wilting:** loss of water makes the plant limp.

### Respiration in plants and photosynthesis compared

- Plants respire **all the time** (day and night); they **photosynthesise only in light**. During the **day**, photosynthesis exceeds respiration so net O₂ is released.

| Photosynthesis | Respiration |
|---|---|
| Makes food (glucose) | **Breaks down food** to release energy |
| Takes in CO₂ and releases O₂ | Takes in O₂ and releases CO₂ |
| Only in **chlorophyll-containing cells, in light** | **All living cells, all the time** |
| **Stores energy** | **Releases energy** (ATP) |

### Plant hormones and movement

| Hormone | Function |
|---|---|
| **Auxin** | **Cell elongation**, phototropism; promotes growth |
| **Gibberellin** | Stem growth, **seed germination** |
| **Cytokinin** | **Cell division**; delays ageing |
| **Abscisic acid (ABA)** | **Inhibits growth**; closes stomata; **wilting and seed dormancy** |
| **Ethylene** | **Ripening of fruit** (gas) |

- **Tropism:** growth movement in response to a stimulus: **phototropism** (light; stem bends towards light), **geotropism** (gravity; **roots grow down**), **hydrotropism** (water), **chemotropism** (pollen tube growth), **thigmotropism** (touch; tendrils).
- **Nastic movement** is not directional: **touch-me-not (Mimosa pudica)** folds its leaves on touch.

:::tip Exam tip
**Photosynthesis: chloroplast; chlorophyll reflects green.** **O₂ released comes from water.** **Starch is tested with iodine (blue-black).** **Cuscuta: parasite. Lichen: symbiosis.** **Pitcher plant: insectivorous.** **Rhizobium: nitrogen fixation in pulses.** **Xylem: water up; phloem: food.** **Ethylene ripens fruit; ABA closes stomata.**
:::

## Human Body: Nutrition, Digestion, Respiration, Circulation and Excretion {#human-body}

### Nutrition and food

| Nutrient | Source | Function | Deficiency |
|---|---|---|---|
| **Carbohydrates** | Rice, wheat, potato, sugar | **Main energy source** (4 kcal/g) | Weakness |
| **Proteins** | Pulses, milk, eggs, meat, soybean | **Growth and repair**; made of **amino acids** | **Kwashiorkor, marasmus** |
| **Fats** | Oils, ghee, nuts | **Stored energy (9 kcal/g)**, insulation | |
| **Vitamins** | Fruits, vegetables | **Protective**; needed in small amounts | See below |
| **Minerals** | Milk, vegetables, salt | Bones, blood, nerves | See below |
| **Water** | Drinks, food | **Transport, temperature control** | **Dehydration** |
| **Roughage (dietary fibre)** | Vegetables, whole grains | **Prevents constipation** | **Constipation** |

- **Balanced diet** has all nutrients in the right amount. **Energy** is measured in **calories** (1 kcal = 4.2 kJ). **BMR** is the energy used at rest.
- **Tests:** **iodine** turns **starch** blue-black; **Benedict's** solution shows **glucose** (orange-red); **copper sulphate + caustic soda (biuret)** shows **protein** (violet); **paper** shows **fat** (grease spot).

### Vitamins

| Vitamin | Chemical name / source | Deficiency disease |
|---|---|---|
| **A** | **Retinol**; carrot, papaya, liver, fish oil | **Night blindness**, xerophthalmia |
| **B1** | **Thiamine**; whole grain, yeast | **Beri-beri** |
| **B2** | **Riboflavin**; milk | Cracked lips, skin |
| **B3** | **Niacin** | **Pellagra** |
| **B6** | Pyridoxine | Anaemia, convulsions |
| **B9** | **Folic acid** | Anaemia, birth defects |
| **B12** | **Cobalamin**; milk, meat (contains **cobalt**) | **Pernicious anaemia** |
| **C** | **Ascorbic acid**; **amla**, citrus fruits, guava | **Scurvy** (bleeding gums) |
| **D** | **Calciferol**; **sunlight**, fish oil, egg yolk | **Rickets** (children), **osteomalacia** (adults) |
| **E** | **Tocopherol**; oils, nuts | Sterility, muscle weakness |
| **K** | **Phylloquinone**; green vegetables | **Delayed blood clotting** |

- **Fat-soluble vitamins: A, D, E, K.** **Water-soluble: B and C.** **Vitamin D is made by skin in sunlight**; **vitamin K by gut bacteria**.
- **Minerals and deficiency:** **calcium** (bones and teeth; **rickets, osteoporosis**), **iron** (haemoglobin; **anaemia**), **iodine** (thyroxine; **goitre**), **phosphorus**, **sodium and potassium** (nerves), **fluorine** (teeth; excess causes **fluorosis**), **zinc**, **copper**.
- **Protein-energy malnutrition:** **kwashiorkor** (protein deficiency), **marasmus** (protein and calories).

### Human digestive system

| Organ | Function |
|---|---|
| **Mouth** | Teeth chew; **saliva** (**salivary amylase/ptyalin**) starts **starch digestion** into maltose |
| **Oesophagus** | **Peristalsis** pushes food down |
| **Stomach** | **Gastric juice**: **HCl** (kills germs, makes acidic), **pepsin** (digests **proteins**), **rennin** (curdles milk), mucus protects the wall |
| **Liver** | **Largest gland**; makes **bile** (**emulsifies fats**, neutralises acid); stores glycogen; **detoxifies** |
| **Gall bladder** | **Stores bile** |
| **Pancreas** | **Pancreatic juice**: **amylase, trypsin, lipase**; also makes **insulin and glucagon** |
| **Small intestine** | **Digestion is completed and absorption occurs** through **villi**; **about 6 to 7 m long**; **duodenum** receives bile; **intestinal juice** has maltase, lipase and others |
| **Large intestine** | Absorbs **water**; forms **faeces** |
| **Anus** | Egestion |

- **Teeth:** **32 in adults** (**20 milk teeth** in children). **Incisors** (cutting), **canines** (tearing), **premolars and molars** (grinding). **Enamel is the hardest substance in the body.**
- **Enzymes** are **biological catalysts**: **amylase** (starch), **pepsin and trypsin** (protein), **lipase** (fats).
- **Peristalsis** is the wave-like movement of the gut.

### Respiration

- **Breathing** is moving air in and out; **cellular respiration** releases energy from glucose in cells: {{C₆H₁₂O₆ + 6O₂ -> 6CO₂ + 6H₂O + energy (ATP)}}.
- **Aerobic** respiration uses oxygen (**38 ATP**); **anaerobic** does not: in **yeast** it gives **ethanol + CO₂**; in **muscles** it gives **lactic acid** (causing cramps) (**2 ATP**).
- **Path of air:** nose, **pharynx, larynx, trachea, bronchi, bronchioles, alveoli**. **Gas exchange** happens in the **alveoli**. **Haemoglobin** carries oxygen.
- **Diaphragm** and **intercostal muscles** control breathing: **inhaling: diaphragm contracts and flattens, ribs lift**; **exhaling: they relax**.
- **Lungs:** **right lung has 3 lobes, left has 2**.
- **Breathing rate (adult at rest): about 12 to 20 per minute.** **Air we breathe out** has about **4% CO₂**.
- **Other animals:** **earthworm (skin), insects (tracheae), fish (gills), frog (skin and lungs), birds and mammals (lungs).**

### Circulation

| Part | Facts |
|---|---|
| **Heart** | **Muscular organ**, size of a fist; **4 chambers: two atria (upper), two ventricles (lower)**; beats about **72 times a minute**; located slightly **left** |
| **Valves** | Prevent backflow of blood |
| **Arteries** | Carry blood **away from the heart**; thick walls; **oxygenated (except pulmonary artery)** |
| **Veins** | Carry blood **to the heart**; valves; **deoxygenated (except pulmonary vein)** |
| **Capillaries** | Thinnest; exchange of materials |
| **Blood pressure** | Normal **120/80 mm Hg**; measured by a **sphygmomanometer** |
| **Pulse** | About 72 per minute |

- **Double circulation:** blood passes through the heart **twice** in one circuit (pulmonary and systemic). **William Harvey** discovered blood circulation.
- **Pacemaker (SA node)** starts the heartbeat. **ECG** records the heart's activity; the **stethoscope** was invented by **Laennec**.

**Blood**

| Component | Function |
|---|---|
| **Plasma (55%)** | Liquid; **90% water**; carries nutrients, hormones, waste |
| **Red blood cells (RBC, erythrocytes)** | **Haemoglobin** (iron) carries oxygen; **no nucleus**; made in **bone marrow**; **lifespan about 120 days**; **about 5 million/mm³** |
| **White blood cells (WBC, leucocytes)** | **Fight infection** (immunity); **lifespan short**; about 5000 to 10,000/mm³ |
| **Platelets (thrombocytes)** | **Blood clotting**; about 1.5 to 4 lakh/mm³ |

- **Blood groups** (**Karl Landsteiner**): **A, B, AB, O**. **O** is the **universal donor** (no antigens); **AB** is the **universal recipient**. **Rh factor** was found in **rhesus monkey**; **Rh-negative mother with Rh-positive baby** can cause problems.
- **Adult blood volume: about 5 to 6 litres.** **Haemoglobin: 12 to 16 g/dl.** **Anaemia** is low haemoglobin.
- **Lymph** is a colourless fluid with WBCs; **lymphatic system** returns fluid and fights infection. **Spleen** is the **graveyard of RBCs**; **bone marrow** makes blood cells.
- **Blood clotting** needs platelets, **vitamin K** and **calcium**.

### Excretion

- **Excretion** removes metabolic wastes. **Human excretory system:** **two kidneys, two ureters, urinary bladder, urethra**.
- **Kidney** (bean-shaped) has about **a million nephrons** (**structural and functional unit**) which **filter blood**; **urine** is formed by **filtration, reabsorption and secretion**.
- **Urine** is **about 95% water**, **urea**, uric acid, salts; **pale yellow due to urochrome**. **Normal urine is slightly acidic.**
- **Dialysis (artificial kidney)** treats kidney failure; **kidney transplant** is another option.
- **Other excretory organs:** **skin (sweat)**, **lungs (CO₂)**, **liver (bile pigments, urea formation)**.
- **Excretory products:** **ammonia** (fish, ammonotelic), **urea** (humans, ureotelic), **uric acid** (birds and reptiles, uricotelic).
- **Kidney stones** are calcium oxalate. **Diabetes** and **hypertension** harm kidneys.

:::tip Exam tip
**Liver: largest gland. Small intestine: absorption.** **Enamel is the hardest part of the body.** **Alveoli: gas exchange. Nephron: functional unit of kidney.** **Pulmonary artery carries deoxygenated blood.** **O is universal donor; AB universal recipient.** **Vitamin K clotting; vitamin D rickets; vitamin C scurvy.**
:::

## Control, Coordination and Hormones {#control}

### Nervous system

- **Neuron** is the unit: **dendrites** (receive), **cell body**, **axon** (carries away). **Synapse** is the gap between two neurons; **neurotransmitters** (acetylcholine) pass the impulse.
- **Central nervous system (CNS):** **brain and spinal cord**. **Peripheral:** cranial and spinal nerves. **Autonomic nervous system** controls **involuntary** actions (**sympathetic** and **parasympathetic**).

| Brain part | Function |
|---|---|
| **Cerebrum** | **Largest part**; **thinking, memory, intelligence, speech**, voluntary actions; seat of **consciousness** |
| **Cerebellum** | **Balance, posture, coordination** |
| **Medulla oblongata** | **Involuntary actions:** **breathing, heartbeat, blood pressure, vomiting, swallowing** |
| **Hypothalamus** | **Body temperature, hunger, thirst, sleep**; links nerves and hormones |
| **Pituitary** | Master gland (attached below the brain) |

- **Adult human brain weighs about 1.3 to 1.4 kg** and is protected by the **skull** and **meninges**, with **cerebrospinal fluid**.
- **Reflex action:** a **sudden, automatic response** (touching a hot object, blinking, sneezing, knee jerk) controlled by the **spinal cord** through the **reflex arc**: receptor, sensory neuron, spinal cord, motor neuron, effector. It is **faster** than a voluntary action.
- **Twelve pairs of cranial nerves and 31 pairs of spinal nerves** in humans.

### Sense organs

| Organ | Facts |
|---|---|
| **Eye** | **Vision**; see the Light topic |
| **Ear** | **Hearing and balance** (**semicircular canals** for balance) |
| **Nose** | **Smell** (olfactory receptors) |
| **Tongue** | **Taste**: sweet, salty, sour, bitter and **umami**. Older books show a tongue map with separate zones, but all tastes can be sensed over the whole tongue |
| **Skin** | **Touch, pain, pressure, temperature** |

### Endocrine system and hormones

Hormones are **chemical messengers** released **directly into the blood** by **ductless (endocrine) glands**; they act slowly but for longer than nerves.

| Gland | Hormone | Function / disorder |
|---|---|---|
| **Pituitary** ("master gland") | **Growth hormone**, **FSH, LH, TSH, ACTH, prolactin, oxytocin, ADH** | **Dwarfism** (low GH), **gigantism** (excess in childhood), **acromegaly** (adult) |
| **Thyroid** | **Thyroxine** (needs **iodine**) | Controls **metabolism**; **goitre** (iodine lack), **cretinism** (child), hypo- and hyperthyroidism |
| **Parathyroid** | **Parathormone** | **Calcium level in blood** |
| **Pancreas** | **Insulin** (lowers blood sugar), **glucagon** (raises it) | **Diabetes** (low insulin) |
| **Adrenal** | **Adrenaline** | **"Fight, flight or fright" hormone**; **emergency**; raises heartbeat |
| **Testes** | **Testosterone** | Male sex characters |
| **Ovaries** | **Oestrogen, progesterone** | Female sex characters, pregnancy |
| **Pineal** | **Melatonin** | Sleep cycle |
| **Thymus** | **Thymosin** | Immunity (shrinks with age) |

- **Pancreas is both exocrine and endocrine.** **Insulin** was discovered by **Banting and Best**.
- **Feedback mechanism** keeps hormones balanced.
- **Pheromones** are chemicals used for **communication** between members of a species (insects).
- **Diabetes mellitus:** high blood sugar from low insulin; treated by **insulin injections** and diet.

:::tip Exam tip
**Cerebellum: balance. Medulla: involuntary actions. Cerebrum: thinking.** **Reflex action is controlled by the spinal cord.** **Pituitary: master gland.** **Insulin: pancreas.** **Thyroxine needs iodine.** **Adrenaline: emergency hormone.** **Neuron is the structural unit of the nervous system.**
:::

## Reproduction {#reproduction}

### Asexual reproduction

One parent, **no gametes**, offspring are **genetically identical (clones)**.

| Method | Organisms |
|---|---|
| **Binary fission** | **Amoeba, paramecium, bacteria** |
| **Budding** | **Yeast, hydra** |
| **Fragmentation** | **Spirogyra, planaria** |
| **Spore formation** | **Fungi (Rhizopus), ferns, mosses** |
| **Regeneration** | **Hydra, planaria, starfish** |
| **Vegetative propagation** | **Plants:** **cutting** (rose, sugarcane), **layering** (jasmine), **grafting** (mango), **tissue culture**; **leaves** of **Bryophyllum**; **tubers** (potato); **bulbs** (onion) |

### Sexual reproduction in plants

- **Flower parts:** **sepals** (calyx, protect), **petals** (corolla, attract insects), **stamen** (male: **anther** produces **pollen**, **filament**), **pistil / carpel** (female: **stigma, style, ovary**; the **ovary has ovules**).
- **Pollination:** transfer of pollen from **anther to stigma**: **self-pollination** (same flower) or **cross-pollination** (by **wind, water, insects, birds, animals**).
- **Fertilisation:** the male gamete fuses with the **egg** in the ovule, forming a **zygote**. **Double fertilisation** is a feature of angiosperms.
- After fertilisation: **ovary becomes the fruit, ovule becomes the seed**. **Seed has a seed coat, embryo and cotyledons**.
- **Germination:** seed grows into a seedling; needs **water, air, suitable temperature**.
- **Seed dispersal** by **wind** (maple, dandelion, drumstick), **water** (coconut, lotus), **animals** (burr, xanthium), **explosion** (castor, pea).
- **Parthenocarpy:** fruit without fertilisation (seedless banana, grapes).

### Human reproduction

| Male system | Female system |
|---|---|
| **Testes** (in the **scrotum**): **sperms and testosterone**; **vas deferens**; **seminal vesicle and prostate** make semen; **urethra** | **Ovaries** (egg and hormones), **fallopian tubes (oviducts)** (**fertilisation here**), **uterus (womb)** (embryo develops), **vagina** |

- **Gametes:** **sperm (male)** and **ovum (female)**. **Fertilisation** gives a **zygote**, which divides to become an **embryo**, then a **foetus**; it implants in the uterus lining.
- **Placenta** supplies food and oxygen to the embryo through the **umbilical cord** and removes wastes.
- **Gestation (pregnancy) lasts about 9 months (about 280 days).**
- **Menstrual cycle:** about **28 days**; **ovulation** (release of egg) occurs about the **14th day**. **Menarche** is the first period; **menopause** is its end (about **45 to 50 years**).
- **Sex determination in humans:** **females XX; males XY**. The **father's sperm (X or Y)** decides the baby's sex.
- **Puberty:** age of sexual maturity (**about 10 to 12 for girls, 12 to 14 for boys**); **adolescence** is the 11 to 19 age group.
- **Twins:** **identical** (one egg splits) and **fraternal** (two eggs). **IVF** (in vitro fertilisation, **test-tube baby**; **Louise Brown**, 1978; India: **Harsha**, 1986) helps infertility.
- **Contraception:** **barrier** (condoms), **IUDs (copper-T)**, **oral pills** (hormonal), **surgical** (vasectomy, tubectomy). **Condoms also prevent STIs.** **Amniocentesis** (sex-determination test) is **banned**; **female foeticide is illegal** (**PCPNDT Act**).
- **Metamorphosis** in animals: **frog** (egg, **tadpole**, adult), **butterfly and silkworm** (egg, larva, **pupa**, adult) controlled by hormones.

:::tip Exam tip
**Fertilisation in humans occurs in the fallopian tube.** **Father decides the sex: XY.** **Yeast: budding; Amoeba: binary fission; Rhizopus: spores.** **Ovary becomes the fruit; ovule becomes the seed.** **Pollination is transfer of pollen to stigma.** **Gestation is about 9 months.**
:::

## Heredity and Evolution {#heredity}

### Heredity

- **Heredity** is the passing of traits from parents to offspring; **variation** is the difference between individuals.
- **Gregor Mendel** (**Father of Genetics**) worked on **pea plants** (*Pisum sativum*) and published in **1866**. He studied **seven pairs of contrasting traits** (height, seed shape, seed colour, flower colour and others).
- **Mendel's laws:** the **law of dominance**, the **law of segregation**, and the **law of independent assortment**.
- **Terms:** **dominant** (expressed), **recessive** (hidden unless both alleles are recessive), **allele**, **genotype** (genetic make-up), **phenotype** (visible character), **homozygous** (identical alleles), **heterozygous** (different alleles).
- **Monohybrid cross** (tall x dwarf pea): **F1 all tall; F₂ ratio 3 : 1** (phenotype) and 1 : 2 : 1 (genotype). **Dihybrid ratio:** **9 : 3 : 3 : 1**.
- **Chromosomes** carry **genes**; **DNA** has the genetic code. **Watson and Crick** (1953) gave the **double-helix** model of DNA (with **Rosalind Franklin** and **Maurice Wilkins** contributing the X-ray data). **DNA bases:** **A pairs with T; G pairs with C**. **RNA** has **uracil (U)** in place of thymine.
- **Genes and proteins:** **DNA, mRNA, protein**; **RNA types: mRNA, tRNA, rRNA**.
- **Sex chromosomes:** **XX female, XY male**; **autosomes** are the other **22 pairs**. **Human chromosome number: 46.**
- **Genetic disorders:** **haemophilia** (blood does not clot; **X-linked**), **colour blindness** (X-linked), **thalassemia**, **sickle-cell anaemia**, **Down syndrome** (**trisomy 21**, an extra chromosome 21), **Turner syndrome** (XO), **Klinefelter** (XXY).
- **Mutation:** sudden change in DNA. **Genetic engineering** and **biotechnology:** **Bt cotton** (resistant to bollworm), **recombinant insulin**, **DNA fingerprinting** (Alec Jeffreys), **GM crops**, **gene therapy**, **cloning** (**Dolly the sheep, 1996**, first cloned mammal), **stem cells**.
- **Human Genome Project** (completed in 2003) mapped human DNA (about 20,000 to 25,000 genes).

### Evolution

- **Evolution** is the gradual change of organisms over time.
- **Lamarck:** theory of **inheritance of acquired characters** (giraffe's neck); now rejected.
- **Charles Darwin:** book **"On the Origin of Species" (1859)**; **natural selection** ("**survival of the fittest**"); voyage on **HMS Beagle**; visited the **Galapagos Islands** (finches).
- **Evidences:** **fossils** (dating by **carbon-14**), **homologous organs** (same structure, different function: **human arm, whale flipper, bat wing**) and **analogous organs** (different structure, same function: **wings of birds and insects**), **vestigial organs** (**appendix, wisdom teeth, tail bone**), **embryology**, **missing links** (**Archaeopteryx**: reptile and bird).
- **Speciation** forms new species through **geographical isolation** and variation.
- **Human evolution:** **Dryopithecus, Ramapithecus, Australopithecus, Homo habilis, Homo erectus, Homo neanderthalensis, Homo sapiens** (modern humans, appeared in Africa about **300,000 years ago**).
- **Artificial selection** (breeding): **wild cabbage** gave cabbage, cauliflower, broccoli, kale and kohlrabi.

:::tip Exam tip
**Mendel: Father of Genetics; pea plant; F₂ ratio 3:1; dihybrid 9:3:3:1.** **Darwin: natural selection, 1859.** **Haemophilia: X-linked.** **Down syndrome: trisomy 21.** **Wings of birds and insects: analogous.** **Human arm and bat wing: homologous.** **Dolly: first cloned mammal.** **Child's sex: father's sperm decides.**
:::

## Health, Diseases and Immunity {#health}

### Health

**Health** (WHO) is a state of **complete physical, mental and social well-being**, not just the absence of disease. **WHO** was founded in **1948**; **World Health Day is 7 April**.

### Types of diseases

| Type | Features | Examples |
|---|---|---|
| **Infectious (communicable)** | Caused by **pathogens**, spread to others | Cold, TB, malaria |
| **Non-infectious** | Not spread; **lifestyle, genetic, ageing** | **Cancer, diabetes, hypertension, heart disease** |
| **Deficiency** | **Lack of nutrients** | Scurvy, rickets, goitre |
| **Genetic** | Inherited | Haemophilia, thalassemia |

### Diseases caused by pathogens

| Pathogen | Disease |
|---|---|
| **Virus** | **Common cold, influenza, polio, measles, mumps, chickenpox, smallpox (eradicated 1980), dengue, rabies, hepatitis A/B/C, AIDS (HIV), COVID-19, Japanese encephalitis, chikungunya** |
| **Bacteria** | **Tuberculosis, typhoid, cholera, tetanus, diphtheria, whooping cough, leprosy, plague, anthrax, pneumonia** |
| **Protozoa** | **Malaria (Plasmodium)**, amoebic dysentery, sleeping sickness, kala-azar |
| **Fungi** | **Ringworm, athlete's foot**, candidiasis |
| **Worms (helminths)** | **Ascariasis, filariasis (elephantiasis), tapeworm infection** |

- **Vector:** carries the pathogen: **female Anopheles mosquito** (**malaria**), **Aedes mosquito** (**dengue, chikungunya, yellow fever**), **Culex** (filaria, Japanese encephalitis), **housefly** (cholera, typhoid), **tsetse fly** (sleeping sickness), **rat flea** (plague), **sandfly** (kala-azar).
- **Mode of spread:** air (**TB, cold, COVID-19**), water and food (**cholera, typhoid, jaundice**), contact (**ringworm, scabies**), vector, blood and sexual contact (**HIV, hepatitis B**).
- **Malaria:** fever with chills; **quinine** and **chloroquine** are medicines. **Dengue:** low platelets.
- **AIDS:** caused by **HIV**, which attacks **T-lymphocytes (WBC)** and weakens immunity; spreads by **blood, unsafe sex and from mother to child**; **not by touch, mosquito or sharing food**. **ELISA** is a test.
- **Tuberculosis:** **Mycobacterium tuberculosis**, discovered by **Robert Koch**; **BCG** vaccine; **DOTS** therapy.
- **Cancer:** uncontrolled cell division; **tumours** (benign, malignant); caused by **tobacco, radiation, carcinogens**. **Early detection and surgery, radiotherapy, chemotherapy** are treatments.
- **Diabetes, hypertension and obesity** are **lifestyle diseases**.

### Immunity and vaccines

- **Immunity** is the body's ability to fight disease. **Innate** (skin, mucus, acid) and **acquired**. **WBCs** produce **antibodies** against **antigens**.
- **Vaccination:** a **weak or dead pathogen** trains the body to make antibodies: **active immunity**. **Edward Jenner** (smallpox, using **cowpox**, 1796). **Passive immunity** is from **ready-made antibodies** (mother's milk, **antiserum**).
- **Important vaccines:** **BCG** (TB), **DPT** (diphtheria, pertussis, tetanus), **OPV and IPV** (polio), **MMR** (measles, mumps, rubella), **hepatitis B**, **HPV** and **rotavirus**. **Polio** was declared **eliminated from India in 2014** (WHO). **Pulse Polio** is a national programme. **Mission Indradhanush** raised immunisation.
- **Antibiotics** work on **bacteria, not viruses**. **Penicillin** was found by **Fleming (1928)**. **Misusing them** causes **antibiotic resistance**.
- **Antiseptics** (used on living tissue) and **disinfectants** (on objects).
- **First aid, ORS (oral rehydration solution)** for diarrhoea and cholera.
- **Allergy:** an exaggerated immune response (to pollen, dust, certain foods); **antihistamines** treat it.
- **Drug abuse:** **alcohol damages the liver (cirrhosis)**; **smoking causes lung cancer and heart disease** (**nicotine, tar, carbon monoxide**); **World No Tobacco Day: 31 May**; **World AIDS Day: 1 December**; **World TB Day: 24 March**; **World Malaria Day: 25 April**.

:::tip Exam tip
**Malaria: female Anopheles; Plasmodium (protozoa).** **Dengue: Aedes.** **TB: BCG; AIDS: HIV attacks T-cells.** **Antibiotics don't work on viruses.** **Cholera and typhoid: contaminated water.** **Jenner: smallpox vaccine.** **Rickets: vitamin D; scurvy: vitamin C.**
:::

## Environment, Ecosystem and Agriculture {#environment}

### Ecosystem

An **ecosystem** is a community of living things interacting with the non-living environment (**Tansley**, 1935 coined the term).

- **Biotic** (living) and **abiotic** (non-living: soil, water, light, temperature). **Producers (autotrophs):** plants. **Consumers:** **herbivores** (primary), **carnivores** (secondary and tertiary), **omnivores**. **Decomposers:** **bacteria and fungi** (recycle nutrients).
- **Natural ecosystems:** forest, grassland, desert, pond, lake, river, ocean. **Artificial:** garden, crop field, aquarium.
- **Food chain:** grass, grasshopper, frog, snake, eagle. **Food web** is many linked chains. **Trophic levels:** producer, primary consumer, secondary consumer, tertiary consumer.
- **Energy flow (10 per cent law, Lindeman):** only **about 10% of energy passes to the next trophic level**; the rest is lost as heat. So **food chains are short (3 to 5 levels)**; a **vegetarian diet** uses energy more efficiently.
- **Pyramids:** of **number, biomass and energy**. **Energy pyramid is always upright.**
- **Biomagnification:** harmful chemicals (**DDT**, mercury) **increase in concentration** along the food chain; the **top** consumer is most affected.

### Biogeochemical cycles

- **Water (hydrological) cycle:** evaporation, condensation, precipitation. **Transpiration** adds to it.
- **Carbon cycle:** **photosynthesis** takes CO₂; **respiration, burning and decay** return it. **Carbon sinks:** forests and oceans.
- **Nitrogen cycle:** **nitrogen fixation** (Rhizobium, lightning), **nitrification**, assimilation, **denitrification** (returns N₂ to the air).
- **Oxygen cycle** links photosynthesis and respiration.

### Biodiversity and conservation

- **Biodiversity** is the variety of life. **India is a mega-diverse country**, with **four hotspots**: **Himalaya, Western Ghats, Indo-Burma and Sundaland (Nicobar)**.
- **In situ conservation:** in natural habitat: **national parks, wildlife sanctuaries, biosphere reserves**. **Ex situ:** outside: **zoos, botanical gardens, seed banks, gene banks**.
- **In J&K:** **Dachigam National Park** (home of the **hangul or Kashmir stag**), **Kishtwar National Park**, **Hemis National Park (Ladakh)** (**snow leopard**), **Overa-Aru**, **Salim Ali National Park**, **Dal Lake**, **Wular Lake**, **Hokersar** wetland (**Ramsar site**).
- **IUCN Red List** classifies **endangered species** (**tiger, snow leopard, Great Indian Bustard, hangul, Asiatic lion, one-horned rhino**). **Project Tiger** (1973), **Project Elephant** (1992), **Project Snow Leopard**. **Wildlife Protection Act, 1972.**
- **Extinct:** **dodo**, **passenger pigeon**, **Indian cheetah** (re-introduced from Africa in 2022 to 2023 at **Kuno National Park**).
- **Forests:** **deforestation** causes soil erosion, floods and climate change. **Chipko movement** (**Sunderlal Bahuguna**, Uttarakhand) saved trees; **Van Mahotsav** (July). **Joint Forest Management**.
- **Sacred groves** and **Bishnoi** community protect nature.

### Pollution

| Type | Causes | Effects |
|---|---|---|
| **Air** | **Vehicles, factories, burning of crop stubble, CO, SO₂, NOₓ, particulate matter (PM₂.₅ and PM₁₀)** | Smog, asthma, **acid rain** |
| **Water** | Sewage, industrial waste, **plastics, pesticides, oil spills** | Disease, **eutrophication**, fish deaths |
| **Soil** | **Chemical fertilisers, pesticides, plastics** | Loss of fertility |
| **Noise** | Traffic, loudspeakers | Hearing loss, stress; **safe level below 85 dB** |
| **Thermal** | Hot water from power plants | Fewer aquatic species |
| **Radioactive** | Nuclear waste | Cancer, genetic damage |

- **Global warming** is from the **greenhouse effect**; the **Kyoto Protocol (1997)**, **Paris Agreement (2015)** aim to limit it. **Ozone hole** over **Antarctica**.
- **Acid rain:** **SO₂ and NO₂** dissolve in rain; harms the **Taj Mahal (marble cancer)**.
- **Smog:** smoke + fog. **Photochemical smog** forms from vehicle exhaust in sunlight.
- **Tests and measures:** **Air Quality Index (AQI)**; **National Green Tribunal (2010)**; **Environment Protection Act, 1986**; **World Environment Day: 5 June**; **Earth Day: 22 April**; **World Water Day: 22 March**; **World Wildlife Day: 3 March**; **International Day of Biodiversity: 22 May**.
- **Waste management:** **segregate (wet and dry)**, **compost**, **recycle**, **reduce plastics**; **Swachh Bharat Mission** (2014).
- **Renewable resources** (air, water, forests) and **non-renewable** (coal, petroleum).

### Agriculture and animal husbandry

- **Crop seasons in India:** **Kharif** (June to Oct; sown with the monsoon): **rice, maize, cotton, jowar, bajra, soybean, groundnut**; **Rabi** (Oct to Mar; winter): **wheat, barley, gram, mustard, peas**; **Zaid** (summer): **watermelon, cucumber, vegetables**.
- **Steps:** preparation of soil, **sowing**, adding **manure and fertilisers**, **irrigation**, **weeding**, **harvesting**, **threshing**, storage.
- **Green Revolution (1960s)** under **M. S. Swaminathan** (father of the Indian Green Revolution) with **Norman Borlaug**: high-yield **wheat and rice**. **White Revolution (Operation Flood)**: milk, **Verghese Kurien**. **Blue Revolution**: fish. **Yellow Revolution**: oilseeds. **Pink Revolution**: prawn and meat. **Silver Revolution**: eggs and poultry.
- **Manure** is organic (compost, vermicompost, green manure); **fertilisers** are chemical (urea). **Crop rotation** and **mixed cropping** keep fertility. **Organic farming** avoids chemicals.
- **Irrigation:** canal, tube well, **drip and sprinkler** (save water).
- **Weeds** (Parthenium, Cyperus) are controlled with **weedicides** (2,4-D). **Pests:** insecticides; **biopesticides** like neem.
- **Animal husbandry:** **cattle** (indigenous: **Sahiwal, Gir**; exotic: **Jersey, Holstein**), **poultry** (**broilers, layers**), **fisheries** (**pisciculture**; **aquaculture**), **apiculture** (bee-keeping, honey and wax), **sericulture** (**silk**; **mulberry silkworm**).
- **Kashmir saffron** (**Crocus sativus**; **Pampore**), **apples, walnuts, almonds**, **Basmati of R.S. Pura** and **pashmina** (from **Changthangi goat**) are J&K products with **GI tags**.
- **Food preservation and storage** reduce **post-harvest loss**. **Buffer stock** is kept by **FCI**.
- **Types of soil in India:** **alluvial** (most fertile; widest), **black (regur; cotton)**, **red**, **laterite**, **desert**, **mountain**.

:::tip Exam tip
**10% energy law.** **Producers are plants; decomposers recycle.** **Biomagnification: DDT at the top of the food chain.** **Kharif: rice; Rabi: wheat.** **Chipko: Sunderlal Bahuguna.** **Dachigam: hangul.** **Green Revolution: Swaminathan; White: Kurien.** **World Environment Day: 5 June.** **Acid rain: SO₂ and NO₂.**
:::

@unit Quick Revision

## Scientists, Discoveries and Inventions {#scientists}

| Scientist | Contribution |
|---|---|
| **Isaac Newton** | Laws of motion, **gravitation**, dispersion of light, reflecting telescope |
| **Galileo Galilei** | Telescope observations (moons of Jupiter), laws of falling bodies, pendulum |
| **Archimedes** | **Buoyancy (upthrust) principle** |
| **Albert Einstein** | **Relativity**, E = mc², **photoelectric effect** (Nobel 1921) |
| **Michael Faraday** | **Electromagnetic induction**, laws of electrolysis |
| **Hans Oersted** | Magnetic effect of electric current |
| **Alessandro Volta** | **Voltaic cell** (battery) |
| **Luigi Galvani** | Animal electricity |
| **Georg Ohm** | **Ohm's law** |
| **James Watt** | Improved the **steam engine** |
| **Thomas Edison** | **Phonograph, electric bulb (carbon filament)** |
| **Graham Bell** | **Telephone** (1876) |
| **Marconi** | **Radio (wireless telegraphy)** |
| **J. L. Baird** | **Television** |
| **Wright brothers** | First **aeroplane** (1903) |
| **Roentgen** | **X-rays** (1895) |
| **Becquerel** | **Radioactivity** |
| **Marie Curie** | **Polonium and radium**; two Nobel Prizes (physics, chemistry) |
| **J. J. Thomson** | **Electron** |
| **Rutherford** | **Nucleus**, proton |
| **Chadwick** | **Neutron** |
| **Niels Bohr** | Atomic model |
| **Dalton** | **Atomic theory** |
| **Mendeleev** | **Periodic table** |
| **Lavoisier** | Law of conservation of mass; "Father of Modern Chemistry"; named oxygen |
| **Priestley** | Discovered **oxygen** |
| **Cavendish** | **Hydrogen**; value of G |
| **Robert Boyle** | **Boyle's law** (gas pressure and volume) |
| **Avogadro** | **Avogadro's hypothesis** |
| **Alfred Nobel** | **Dynamite**; Nobel Prizes |
| **Alexander Fleming** | **Penicillin** (1928) |
| **Edward Jenner** | **Smallpox vaccine** |
| **Louis Pasteur** | Germ theory, **pasteurisation**, rabies vaccine |
| **Robert Koch** | **TB and cholera** bacteria |
| **Ronald Ross** | **Malaria parasite** in mosquitoes |
| **William Harvey** | **Blood circulation** |
| **Landsteiner** | **Blood groups** |
| **Banting and Best** | **Insulin** |
| **Darwin** | **Natural selection** |
| **Mendel** | **Laws of heredity** |
| **Watson and Crick** | **DNA double helix** |
| **Hooke** | Cell | 
| **Robert Brown** | Nucleus; Brownian motion |
| **Linnaeus** | **Binomial nomenclature** |
| **Stephen Hawking** | Black holes, **A Brief History of Time** |

### Indian scientists

| Scientist | Contribution |
|---|---|
| **C. V. Raman** | **Raman effect** (scattering of light), **Nobel Prize in Physics 1930** (first Asian in science); **National Science Day: 28 February** |
| **J. C. Bose** | **Crescograph**; showed **plants respond to stimuli**; wireless waves |
| **Srinivasa Ramanujan** | Mathematician; **National Mathematics Day: 22 December** |
| **Homi J. Bhabha** | Father of the **Indian nuclear programme** |
| **Vikram Sarabhai** | Father of the **Indian space programme** |
| **A. P. J. Abdul Kalam** | **Missile Man**, 11th President, SLV-III and Agni |
| **S. Chandrasekhar** | **Chandrasekhar limit** (white dwarf mass); **Nobel Prize 1983** |
| **Har Gobind Khorana** | **Genetic code**; **Nobel Prize 1968** |
| **M. S. Swaminathan** | **Green Revolution** |
| **Meghnad Saha** | **Ionisation equation** |
| **S. N. Bose** | **Bose-Einstein statistics**; **boson** |
| **Salim Ali** | **Birdman of India** |
| **Aryabhata** | Zero, value of pi, **Aryabhatiya**; first Indian satellite named after him |
| **Sushruta** | **Father of Surgery** (plastic surgery) |
| **Charaka** | **Father of Indian Medicine**, Charaka Samhita |
| **Venkatraman Ramakrishnan** | **Nobel Prize in Chemistry 2009** (ribosome structure) |

## Units, Instruments and Quick Facts {#units-instruments}

### Units

| Quantity | SI unit | Quantity | SI unit |
|---|---|---|---|
| Force | **newton** | Pressure | **pascal** |
| Work, energy, heat | **joule** | Power | **watt** |
| Frequency | **hertz** | Charge | **coulomb** |
| Potential difference | **volt** | Resistance | **ohm** |
| Capacitance | **farad** | Magnetic field | **tesla** |
| Radioactivity | **becquerel** | Illumination | **lux** |
| Power of lens | **dioptre** | Sound intensity | **decibel** |
| Speed | **m/s** | Acceleration | **m/s²** |
| Momentum | **kg m/s** | Density | **kg/m³** |
| Wavelength | **metre** (also angstrom) | Distance of stars | **light year** |

### Instruments

| Instrument | Use |
|---|---|
| **Barometer** | Atmospheric pressure |
| **Hygrometer** | Humidity |
| **Anemometer** | Wind speed |
| **Thermometer** | Temperature |
| **Pyrometer** | Very high temperature |
| **Seismograph** | Earthquake |
| **Sphygmomanometer** | Blood pressure |
| **Stethoscope** | Heart and lung sounds |
| **Lactometer** | Purity of milk |
| **Hydrometer** | Density of liquids |
| **Ammeter** | Current |
| **Voltmeter** | Potential difference |
| **Galvanometer** | Detects small current |
| **Altimeter** | Altitude |
| **Odometer** | Distance travelled |
| **Speedometer** | Speed |
| **Periscope** | See above obstacles |
| **Telescope** | Distant objects |
| **Microscope** | Tiny objects |
| **Spectrometer** | Spectra |
| **Dynamo** | Mechanical to electrical |
| **Radar** | Locate objects by radio waves |
| **SONAR** | Underwater distances by sound |
| **Cardiograph (ECG)** | Heart's activity |
| **Rain gauge (pluviometer)** | Rainfall |
| **Ultrasound** | Scans inside the body |

## One-Liners to Remember {#science-one-liners}

### Physics

- **SI unit of force: newton; of energy: joule; of power: watt.**
- **Acceleration due to gravity: 9.8 m/s². Speed of light: 3 × 10⁸ m/s. Speed of sound in air: about 340 m/s.**
- **Sound needs a medium; light does not.** **Sound is fastest in solids.**
- **Audible range: 20 Hz to 20,000 Hz.**
- **Concave mirror: shaving mirror, headlights. Convex mirror: rear-view mirror.**
- **Myopia: concave lens. Hypermetropia: convex lens.**
- **Blue sky: scattering. Red danger signal: scatters least.**
- **Ammeter in series; voltmeter in parallel.** **Household circuits: parallel.**
- **Motor: electrical to mechanical. Generator: mechanical to electrical.**
- **Water is densest at 4 C.** **Normal body temperature: 37 C or 98.6 F.**
- **Hottest planet: Venus. Largest: Jupiter. Smallest: Mercury. Red planet: Mars.**
- **Geostationary orbit: 36,000 km.**

### Chemistry

- **pH of pure water: 7. Blood: about 7.4. Stomach: about 1.5 to 3.**
- **Atomic number = protons. Mass number = protons + neutrons.**
- **Hardest substance: diamond. Best conductor: silver. Liquid metal: mercury. Liquid non-metal: bromine.**
- **Most abundant element in Earth's crust: oxygen. Most abundant metal: aluminium.**
- **Most abundant gas in air: nitrogen (78%).**
- **Baking soda: NaHCO₃. Washing soda: Na₂CO₃. Plaster of Paris: CaSO₄·½H₂O. Bleaching powder: CaOCl₂.**
- **Rusting needs air and water.** **Sodium is kept in kerosene; phosphorus under water.**
- **Alkane: CₙH₂ₙ₊₂; alkene: CₙH₂ₙ; alkyne: CₙH₂ₙ₋₂.**
- **Noble gases have a complete outer shell.** **Helium fills balloons safely.**
- **Dry ice is solid CO₂.** **Laughing gas is nitrous oxide.** **Marsh gas is methane.**

### Biology

- **Powerhouse of the cell: mitochondria. Suicide bag: lysosome. Protein factory: ribosome.**
- **Hooke: cell. Brown: nucleus. Mendel: heredity. Darwin: evolution.**
- **Largest gland: liver. Largest organ: skin. Longest bone: femur. Smallest bone: stirrup.**
- **Universal donor: O. Universal recipient: AB.**
- **Vitamin deficiency: A night blindness; B1 beri-beri; C scurvy; D rickets; K bleeding.**
- **Iodine deficiency: goitre. Iron: anaemia. Calcium: weak bones.**
- **Malaria: Anopheles. Dengue: Aedes. AIDS: HIV. TB: BCG vaccine.**
- **Humans: 46 chromosomes. Sex: XX female, XY male.**
- **Insulin: pancreas. Thyroxine: thyroid. Adrenaline: adrenal.**
- **Xylem: water; phloem: food.** **Photosynthesis in chloroplasts.**
- **Hangul: Dachigam. Snow leopard: Hemis.**
- **Biomagnification: DDT. Food chain energy: 10% law.**

## Full Forms {#science-full-forms}

| Short form | Full form |
|---|---|
| **DNA / RNA** | Deoxyribonucleic Acid / Ribonucleic Acid |
| **ATP** | Adenosine Triphosphate |
| **HIV / AIDS** | Human Immunodeficiency Virus / Acquired Immuno-Deficiency Syndrome |
| **BCG** | Bacillus Calmette-Guerin |
| **DPT / MMR** | Diphtheria, Pertussis, Tetanus / Measles, Mumps, Rubella |
| **ORS** | Oral Rehydration Solution |
| **WHO / FAO** | World Health Organization / Food and Agriculture Organization |
| **ECG / EEG** | Electrocardiogram / Electroencephalogram |
| **MRI / CT** | Magnetic Resonance Imaging / Computed Tomography |
| **LPG / CNG** | Liquefied Petroleum Gas / Compressed Natural Gas |
| **PVC / PET** | Polyvinyl Chloride / Polyethylene Terephthalate |
| **CFC** | Chlorofluorocarbon |
| **BOD** | Biochemical Oxygen Demand |
| **AQI** | Air Quality Index |
| **UV / IR** | Ultraviolet / Infrared |
| **SONAR / RADAR** | Sound Navigation and Ranging / Radio Detection and Ranging |
| **LASER** | Light Amplification by Stimulated Emission of Radiation |
| **LED / LCD** | Light Emitting Diode / Liquid Crystal Display |
| **IUPAC** | International Union of Pure and Applied Chemistry |
| **NPK** | Nitrogen, Phosphorus, Potassium |
| **ISRO / DRDO** | Indian Space Research Organisation / Defence Research and Development Organisation |
| **CSIR / ICAR** | Council of Scientific and Industrial Research / Indian Council of Agricultural Research |
| **STP** | Standard Temperature and Pressure |
| **IVF** | In Vitro Fertilisation |
| **GM** | Genetically Modified |
| **PSLV / GSLV** | Polar / Geosynchronous Satellite Launch Vehicle |

## Practice Questions {#science-practice}

Test yourself, then check the answers below.

1. What is the SI unit of **force**?
2. A car moving at 72 km/h: what is its speed in m/s?
3. Which mirror is used as a **rear-view mirror**?
4. Name the lens used to correct **myopia**.
5. Two resistors of 3 ohm and 6 ohm are in **parallel**. Find the total resistance.
6. Which hormone **lowers blood sugar**?
7. Which gas is released when a **metal reacts with dilute acid**?
8. What is the **pH of pure water**?
9. Which organelle is called the **powerhouse of the cell**?
10. Which vitamin deficiency causes **scurvy**?
11. Name the scientist who discovered the **neutron**.
12. Which planet is called the **Red Planet**?
13. What is the full form of **SONAR**?
14. Which blood group is the **universal donor**?
15. What is the **chemical formula of baking soda**?
16. Which law explains why passengers **jerk forward when a bus brakes**?
17. What is the **function of xylem**?
18. Name the **raw materials of photosynthesis**.
19. Name the compound used to **set fractured bones**.
20. Who proposed the **five-kingdom classification**?
21. What is the **unit of power of a lens**?
22. Which gas turns **lime water milky**?
23. Which organ produces **bile**?
24. In which **trophic level** is a grasshopper?
25. Which scientist gave the **law of natural selection**?
26. Which **vector** spreads malaria?
27. Name the **most reactive metal** among sodium, zinc, copper and gold.
28. What is the **maximum number of electrons** in the M shell?
29. State the **chemical name of vitamin C**.
30. Which **Indian physicist** won the Nobel Prize in 1930?

### Answers

1. **Newton (N).**
2. **72 × 5/18 = 20 m/s.**
3. **Convex mirror.**
4. **Concave lens.**
5. **(3 × 6)/(3 + 6) = 2 ohm.**
6. **Insulin.**
7. **Hydrogen.**
8. **7.**
9. **Mitochondria.**
10. **Vitamin C (ascorbic acid).**
11. **James Chadwick.**
12. **Mars.**
13. **Sound Navigation and Ranging.**
14. **O.**
15. **NaHCO₃ (sodium hydrogencarbonate).**
16. **Newton's first law (inertia).**
17. **It carries water and minerals upward from the roots.**
18. **Carbon dioxide, water and sunlight (with chlorophyll).**
19. **Plaster of Paris.**
20. **R. H. Whittaker.**
21. **Dioptre.**
22. **Carbon dioxide.**
23. **Liver.**
24. **Primary consumer (herbivore).**
25. **Charles Darwin.**
26. **Female Anopheles mosquito.**
27. **Sodium.**
28. **18.**
29. **Ascorbic acid.**
30. **C. V. Raman.**

:::mem Memory trick
For the whole subject, follow the chain **Matter, Energy, Life**: how things are built (atoms, cells), how they move and change (forces, reactions, energy) and how life uses them (nutrition, reproduction, environment).
:::

Practise with our free tests at [JKEdusphere](https://jkedusphere.com).
`,
};
