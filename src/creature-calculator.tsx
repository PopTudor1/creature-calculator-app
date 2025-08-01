import React, { useEffect, useState } from "react";
//ssr images
import BlackDragonIcon from "./assets/ssr-creatures/Black-dragon-icon.png";
import DemonKnightIcon from "./assets/ssr-creatures/Demon-knight-icon.png";
import DragonaIcon from "./assets/ssr-creatures/Dragona-icon.png";
import GaizelIcon from "./assets/ssr-creatures/Gaizel-icon.png";
import IkataIcon from "./assets/ssr-creatures/Ikata-icon.png";
import KaipoonIcon from "./assets/ssr-creatures/Kaipoon-icon.png";
import MantisIcon from "./assets/ssr-creatures/Mantis-icon.png";
import MesisIcon from "./assets/ssr-creatures/Mesis-icon.png";
import PaitosIcon from "./assets/ssr-creatures/Paitos-icon.png";
import PuskaIcon from "./assets/ssr-creatures/Puska-icon.png";
import SameduIcon from "./assets/ssr-creatures/Samedu-icon.png";
import SnookIcon from "./assets/ssr-creatures/Snook-icon.png";
import TriceratopsIcon from "./assets/ssr-creatures/Triceratops-icon.png";
import UnicusIcon from "./assets/ssr-creatures/Unicus-icon.png";
import UrusIcon from "./assets/ssr-creatures/Urus-icon.png";
import VoidBugIcon from "./assets/ssr-creatures/Void-bug-icon.png";
//ur images
import AaronIcon from "./assets/ur-creatures/Aaron-icon.png";
import BlindMonsterIcon from "./assets/ur-creatures/Blind-monster-icon.png";
import DraxillosIcon from "./assets/ur-creatures/Draxillos-icon.png";
import HarclingIcon from "./assets/ur-creatures/Harcling-icon.png";
import LionerIcon from "./assets/ur-creatures/Lioner-icon.png";
import MalbatIcon from "./assets/ur-creatures/Malbat-icon.png";
import MuscleMonsterIcon from "./assets/ur-creatures/Muscle-monster-icon.png";
import NependeadIcon from "./assets/ur-creatures/Nependead-icon.png";
import PumpkinHeadIcon from "./assets/ur-creatures/Pumpkin-head-icon.png";
import RagasIcon from "./assets/ur-creatures/Ragas-icon.png";
import TumoruIcon from "./assets/ur-creatures/Tumoru-icon.png";

import "./creature-calculator.css";

interface FormData {
  image: string;
  evolution: string;
  currentLevel: number;
  maxLevel: number;
  rarity: "SSR" | "UR"; // NEW field
}

//just add the costs in this arrays and all the calculator is updated
const levelCostsSSR: number[] = [
  90, 161, 245, 341, 446, 561, 684, 815, 954, 1100, 1253, 1412, 1577, 1748,
  1925, 2108, 2297, 2490, 2689, 2893, 3101, 3315, 3533, 3755, 3983, 4214, 4450,
  4691, 4935, 5184, 5436, 5693, 5953, 6217, 6485, 6757, 7033, 7312, 7595, 7881,
  8171, 8465, 8761, 9062, 9365, 9672, 9982, 10295, 10612, 10932, 11255, 11581,
  11910, 12242, 12577, 12916, 13257, 13601, 13948, 14298, 14651, 15007, 15365,
  15727, 16091, 16458, 16828, 17200, 17575, 17953, 18334, 18717, 19103, 19491,
  19882, 20276, 20672, 21071, 21472, 21875, 22282, 22690, 23102, 23515, 23931,
  24350, 24771, 25194, 25620, 26048, 26478, 26911, 27346, 27784, 28224, 28666,
  29110, 29557, 30005, 30457, 30910, 31366, 31823, 32283, 32746, 33210, 33677,
  34145, 34616, 35089, 35564, 36042, 36521, 37003, 37486, 37972, 38460, 38950,
  39442, 39935, 40432, 40930, 41430, 41932, 42436, 42942, 43450, 43960, 44472,
  44986, 45502, 46020, 46540, 47062, 47586, 48112, 48639, 49169, 49701, 50234,
  50769, 51306, 51845, 52386, 52929, 53474,
];

const levelCostsUR: number[] = [
  121, 215, 327, 455, 595, 748, 913, 1087, 1272, 1467, 1670, 1882, 2103, 2331,
  2567, 2811, 3000, 3320, 3585, 3857, 4135, 4420, 4711, 5007, 5310, 5619, 5934,
  6254, 6580, 6912, 7248, 7590, 7938, 8290, 8647, 9010, 9377, 9750, 10127,
  10509, 10895, 11286, 11682, 12082, 12487, 12896, 13310, 13727, 14150, 14576,
  15007, 15441, 15880, 16323, 16770, 17221, 17676, 18135, 18598, 19056, 19535,
  20009, 20487, 20969, 21455, 21944, 22437, 22934, 23434, 23938, 24445, 24956,
  25470, 25988, 26510, 27034, 27563, 28094, 28629, 29167, 29709, 30254, 30802,
  31354, 31909, 32467, 33028, 33592, 34160, 34731, 35305, 35882, 36462, 37045,
  37632, 38221, 38814, 39409, 40007, 40609, 41213, 41821, 42431, 43045, 43661,
  44280, 44902, 45527, 46155, 46786, 47419, 48056, 48695, 49337, 49982, 50629,
  51280, 51933, 52589, 53247, 53909, 54573, 55240, 55909, 56581, 57256, 57934,
  58614, 59297,
];

const statsMultiplierSSR = 4;
const statsMultiplierUR = 3.5;

export default function CreatureCalculator(): JSX.Element {
  //add a new object for each new SSR creature
  const imageOptionsSSR = [
    { label: "Dragona", src: DragonaIcon, color: "#d0ebff" },
    { label: "Kaipoon", src: KaipoonIcon, color: "#d0ebff" },
    { label: "Samedu", src: SameduIcon, color: "#d0ebff" },
    { label: "Mesis", src: MesisIcon, color: "#d0ebff" },
    { label: "Triceratops", src: TriceratopsIcon, color: "#d0ebff" },
    { label: "Paitos", src: PaitosIcon, color: "#ffe3e3" },
    { label: "Demon knight", src: DemonKnightIcon, color: "#ffe3e3" },
    { label: "Ikata", src: IkataIcon, color: "#ffe3e3" },
    { label: "Urus", src: UrusIcon, color: "#ffe3e3" },
    { label: "Black dragon", src: BlackDragonIcon, color: "#ffe3e3" },
    { label: "Void bug", src: VoidBugIcon, color: "#ffe3e3" },
    { label: "Gaizel", src: GaizelIcon, color: "#d3f9d8" },
    { label: "Unicus", src: UnicusIcon, color: "#d3f9d8" },
    { label: "Puska", src: PuskaIcon, color: "#d3f9d8" },
    { label: "Snook", src: SnookIcon, color: "#d3f9d8" },
    { label: "Mantis", src: MantisIcon, color: "#d3f9d8" },
  ];

  //add a new object for each new UR creature
  const imageOptionsUR = [
    { label: "Muscle Monster", src: MuscleMonsterIcon, color: "#d0ebff" },
    { label: "Malbat", src: MalbatIcon, color: "#d0ebff" },
    { label: "Aaron", src: AaronIcon, color: "#d0ebff" },
    { label: "Harcling", src: HarclingIcon, color: "#ffe3e3" },
    { label: "Ragas", src: RagasIcon, color: "#ffe3e3" },
    { label: "Pumpkin Head", src: PumpkinHeadIcon, color: "#ffe3e3" },
    { label: "Draxillos", src: DraxillosIcon, color: "#ffe3e3" },
    { label: "Blind Monster", src: BlindMonsterIcon, color: "#d3f9d8" },
    { label: "Nependead", src: NependeadIcon, color: "#d3f9d8" },
    { label: "Tumoru", src: TumoruIcon, color: "#d3f9d8" },
    { label: "Lioner", src: LionerIcon, color: "#d3f9d8" },
  ];

  const evolutionOptionsSSR = [
    // Orange shades (light to dark)
    { evolution: "SSR Unique", color: "#FFE0B2" },
    { evolution: "SSR Unique+1", color: "#FFB74D" },
    { evolution: "SSR Unique+2", color: "#FB8C00" },

    // Red shades (light to dark)
    { evolution: "SSR Epic", color: "#FFCDD2" },
    { evolution: "SSR Epic+1", color: "#EF9A9A" },
    { evolution: "SSR Epic+2", color: "#E57373" },
    { evolution: "SSR Epic+3", color: "#D32F2F" },

    // Purple shades (light to dark)
    { evolution: "SSR Legendary", color: "#E1BEE7" }, // light lavender
    { evolution: "SSR Legendary+1", color: "#BA68C8" }, // medium purple
    { evolution: "SSR Legendary+2", color: "#8E24AA" }, // rich purple
    { evolution: "SSR Legendary+3", color: "#6A1B9A" }, // deep purple
    { evolution: "SSR Legendary+4", color: "#4A148C" }, // very dark purple
    //gray
    { evolution: "SSR Mythic", color: "gray" },
  ];

  const evolutionOptionsUR = [
    // Orange shades (light to dark)
    { evolution: "UR Unique", color: "#FFE0B2" },
    { evolution: "UR Unique+1", color: "#FFB74D" },
    { evolution: "UR Unique+2", color: "#FB8C00" },

    // Red shades (light to dark)
    { evolution: "UR Epic", color: "#FFCDD2" },
    // { evolution: "UR Epic+1", color: "#EF9A9A" },
    // { evolution: "UR Epic+2", color: "#E57373" },
    // { evolution: "UR Epic+3", color: "#D32F2F" },

    // Purple shades (light to dark)
    // { evolution: "UR Legendary", color: "#E1BEE7" },
    // { evolution: "UR Legendary+1", color: "#BA68C8" },
    // { evolution: "UR Legendary+2", color: "#8E24AA" },
    // { evolution: "UR Legendary+3", color: "#6A1B9A" },
    // { evolution: "UR Legendary+4", color: "#4A148C" },
    //gray
    // { evolution: "UR Mythic", color: "gray"},
  ];

  const defaultSSRFormData: FormData = {
    image: imageOptionsSSR[0].src,
    evolution: evolutionOptionsSSR[0].evolution,
    currentLevel: 1,
    maxLevel: 1,
    rarity: "SSR",
  };

  const defaultURFormData: FormData = {
    image: imageOptionsUR[0].src,
    evolution: evolutionOptionsUR[0].evolution,
    currentLevel: 1,
    maxLevel: 1,
    rarity: "UR",
  };

  const [currentDefaultFormData] = useState<FormData>(defaultSSRFormData);

  const [numberOfCreatures, setNumberOfCreatures] = useState<string | number>(
    "3"
  );

  const [forms, setForms] = useState<FormData[]>(
    Array(Number(numberOfCreatures)).fill({ ...currentDefaultFormData })
  );

  function updateForm(index: number, updated: FormData) {
    const newForms = [...forms];
    newForms[index] = updated;
    setForms(newForms);
  }

  function handleChange(index: number, field: keyof FormData, value: unknown) {
    const updated = { ...forms[index], [field]: value };
    updateForm(index, updated);
    //resets the simulation results
    // setFinalLevels(null);
  }

  const [totalResourceInput, setTotalResourceInput] =
    useState<string>("123456");
  const [totalResource, setTotalResource] = useState<number>(123456);
  const [initialTotalStatsSum, setInitialTotalStatsSum] = useState<number>(0);
  const [finalTotalStatsSum, setFinalTotalStatsSum] = useState<number>(0);
  const [remainingResource, setRemainingResource] = useState(totalResource);
  const [finalLevels, setFinalLevels] = useState<number[] | null>(null); // Array to store final levels, changed from object to array
  const gridStyle: React.CSSProperties & {
    [key: `--${string}`]: string | number;
  } = {
    "--num-creatures": numberOfCreatures,
  };

  const calculateTotalStats = (
    level: number,
    evolution: string,
    creatureType: "SSR" | "UR"
  ): number => {
    const baseHealth = getHealthAtLevelGeneralized(level, evolution);
    return creatureType === "SSR"
      ? statsMultiplierSSR * baseHealth
      : statsMultiplierUR * baseHealth;
  };

  const calculateEfficiencyToNextLevel = (
    level: number,
    evolution: string,
    creatureType: "SSR" | "UR"
  ): number => {
    const currentStats = calculateTotalStats(level, evolution, creatureType);
    const nextLevel = level + 1;
    const nextStats = calculateTotalStats(nextLevel, evolution, creatureType);
    const costToNextLevel = getCostAtLevel(nextLevel, creatureType);

    if (costToNextLevel <= 0) {
      return 0; // Avoid division by zero or negative costs
    }

    const statsGain = nextStats - currentStats;
    return (statsGain / costToNextLevel) * 100; // Efficiency as a percentage
  };

  const handleResourceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTotalResourceInput(event.target.value);
  };

  const updateResource = () => {
    const parsedResource = parseInt(totalResourceInput, 10);
    if (!isNaN(parsedResource) && parsedResource >= 0) {
      setTotalResource(parsedResource);
      setRemainingResource(parsedResource);
      setFinalLevels(null); // Reset results when resource changes
      setInitialTotalStatsSum(0);
      setFinalTotalStatsSum(0);
    } else {
      alert("Please enter a valid positive number for the total resource.");
    }
  };

  const runLevelingSimulation = () => {
    if (forms.length === 0) {
      alert("Please provide at least one creature.");
      return;
    }

    for (let i = 0; i < forms.length; i++) {
      const level = Number(forms[i].currentLevel);
      if (isNaN(level) || level <= 0) {
        alert("All creatures must have a starting level greater than 0.");
        return;
      }
    }

    const initialCreatures = forms.map((form, index) => ({
      index: index,
      name:
        form.rarity === "SSR"
          ? imageOptionsSSR.find((opt) => opt.src === form.image)?.label ||
            `Creature ${index + 1}`
          : imageOptionsUR.find((opt) => opt.src === form.image)?.label ||
            `Creature ${index + 1}`,
      currentLevel: Number(form.currentLevel),
      evolution: form.evolution,
      rarity: form.rarity,
    }));

    const initialStats = initialCreatures.reduce((sum, creature) => {
      return (
        sum +
        calculateTotalStats(
          creature.currentLevel,
          creature.evolution,
          creature.rarity
        )
      );
    }, 0);
    setInitialTotalStatsSum(initialStats);

    let currentResource = totalResource;
    const currentCreatureStates = [...initialCreatures];
    const finalLevelsResult: number[] = new Array(6).fill(0);

    while (currentResource > 0) {
      const efficiencies = currentCreatureStates.map((creature) =>
        calculateEfficiencyToNextLevel(
          creature.currentLevel,
          creature.evolution,
          creature.rarity
        )
      );

      // Pair index with efficiency and sort descending
      const efficiencyPairs = efficiencies
        .map((efficiency, index) => ({ index, efficiency }))
        .sort((a, b) => b.efficiency - a.efficiency);

      let leveledUp = false;

      for (const { index: creatureIndex } of efficiencyPairs) {
        const creatureToLevel = currentCreatureStates[creatureIndex];
        const nextLevel = creatureToLevel.currentLevel + 1;
        const cost = getCostAtLevel(
          nextLevel,
          initialCreatures[creatureIndex].rarity
        );

        if (currentResource >= cost && cost > 0) {
          currentCreatureStates[creatureIndex] = {
            ...creatureToLevel,
            currentLevel: nextLevel,
          };
          currentResource -= cost;
          finalLevelsResult[creatureIndex] = nextLevel;
          leveledUp = true;
          break; // Only one creature levels per loop
        }
      }

      if (!leveledUp && currentResource > 0) {
        break; // No upgrades possible
      }
    }

    // Keep original level if no upgrade happened
    for (let i = 0; i < initialCreatures.length; i++) {
      if (finalLevelsResult[i] === 0) {
        finalLevelsResult[i] = initialCreatures[i].currentLevel;
      }
    }

    setRemainingResource(currentResource);

    const finalStatsSum = currentCreatureStates.reduce((sum, creature) => {
      return (
        sum +
        calculateTotalStats(
          creature.currentLevel,
          creature.evolution,
          creature.rarity
        )
      );
    }, 0);
    setFinalTotalStatsSum(finalStatsSum);

    setFinalLevels(finalLevelsResult); // You can still add +1 here if needed
  };

  useEffect(() => {
    setForms((prevForms) => {
      const newForms = [...prevForms];

      // Add default forms if count increased
      while (newForms.length < Number(numberOfCreatures)) {
        newForms.push({ ...currentDefaultFormData });
      }

      // Trim forms if count decreased
      if (newForms.length > Number(numberOfCreatures)) {
        newForms.length = Number(numberOfCreatures);
      }

      return newForms;
    });
  }, [numberOfCreatures]);

  return (
    <div className="container">
      <h1 className="container-title">CREATURE CALCULATOR</h1>
      <span className="madeBy">
        ( made by Tudique26 from the KNIGHTSXORDER guild on Trakan US server )
      </span>
      <section className="notes-section">
        <span className="notes-text">Notes:</span>
        <ul>
          <li className="orange-note">
            THIS CALCULATOR WORKS UP TO LVL {levelCostsSSR.length + 1} FOR SSR
            CREATURES AND UP TO LVL {levelCostsUR.length + 1} FOR UR CREATURES
          </li>
          <li className="red-note">
            If you have SSR creatures over lvl {levelCostsSSR.length + 1} or UR
            creatures UNDER lvl {levelCostsUR.length + 1} and wish to help with
            data support to improve these calculators, add me on discord using
            my id: <span className="highlight-green">"Tudique"</span> or{" "}
            <span className="highlight-green">"Tudique#3272"</span>{" "}
          </li>
          <li>
            Make sure to choose the correct evolution and level to get accurate
            results.
          </li>
          <li>
            Creature health, attack and element damage values vary depending on
            their evolution and level.
          </li>
          <li>
            Cost to reach max level is calculated based on the creature's
            current level and max level.
          </li>
          <li>
            The calculator is still a work in progress, and future updates may
            appear.
          </li>
        </ul>

        <ul className="lightgreen-note">
          <li>
            The two calculators are linked, so the selections made in one
            directly influence the selections in the other one.
          </li>
        </ul>

        <ul className="yellow-note">
          <li>
            Special thanks to Zohix for helping me gather the necessary data.
          </li>
        </ul>
      </section>
      <div className="creature-input-container">
        <div className="creature-input-group">
          <label htmlFor="creatureCount" className="creature-input-label">
            Number of Creatures:
          </label>
          <input
            type="number"
            id="creatureCount"
            value={numberOfCreatures}
            min="1"
            max="6"
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setNumberOfCreatures("");
                return;
              }
              const value = parseInt(val, 10);
              if (!isNaN(value) && value >= 1 && value <= 12) {
                setNumberOfCreatures(value);
              }
            }}
            className="creature-input-field"
            placeholder="No. Creatures"
          />
        </div>
      </div>

      <div className="creature-grid" style={gridStyle}>
        {[
          { label: "Creature rarity:", field: "rarity", type: "rarity" },
          { label: "Creature name:", field: "image", type: "select" },
          { label: "Creature image:", field: "image", type: "image" },
          {
            label: "Creature evolution:",
            field: "evolution",
            type: "evolution",
          },
          { label: "Current level:", field: "currentLevel", type: "number" },
          { label: "Max level:", field: "maxLevel", type: "number" },
          { label: "Food cost to reach max lvl:", field: "cost", type: "cost" },
          {
            label: "Total stats at max lvl:",
            field: "statsTotal",
            type: "calculated",
          },
          {
            label: "Total stats gained:",
            field: "statsGained",
            type: "statsGained",
          },
          {
            label: "Health/Attack at max lvl:",
            field: "health",
            type: "calculated",
          },
          {
            label: "Element damage at max lvl:",
            field: "element",
            type: "calculated",
          },
          {
            label: "Efficiency(higher is better):",
            field: "efficiency",
            type: "efficiency",
          },
        ].map((meta, i) => (
          <React.Fragment key={`row-${i}`}>
            <label className="creature-label">{meta.label}</label>
            {forms.map((form, idx) => {
              const key = `${meta.type}-${idx}-${meta.field}`;
              const bgColor =
                form.rarity === "SSR"
                  ? imageOptionsSSR.find((opt) => opt.src === form.image)
                      ?.color || "white"
                  : imageOptionsUR.find((opt) => opt.src === form.image)
                      ?.color || "white";

              const selectedEvolutionColor =
                form.rarity === "SSR"
                  ? evolutionOptionsSSR.find(
                      (opt) => opt.evolution === form.evolution
                    )?.color || "white"
                  : evolutionOptionsUR.find(
                      (opt) => opt.evolution === form.evolution
                    )?.color || "white";

              switch (meta.type) {
                case "rarity":
                  return (
                    <select
                      className="select-base"
                      value={form.rarity}
                      onChange={(e) => {
                        const newRarity = e.target.value;
                        const defaultData =
                          newRarity === "SSR"
                            ? defaultSSRFormData
                            : defaultURFormData;
                        updateForm(idx, {
                          ...forms[idx],
                          // rarity: newRarity,
                          ...defaultData,
                        });
                      }}
                      style={{
                        backgroundColor:
                          form.rarity === "SSR" ? "yellow" : "#40E0D0",
                      }}
                    >
                      <option value="SSR" className="select-option-yellow">
                        SSR
                      </option>
                      <option value="UR" className="select-option-turquoise">
                        UR
                      </option>
                    </select>
                  );
                case "select": {
                  const imageOptions =
                    form.rarity === "SSR" ? imageOptionsSSR : imageOptionsUR;
                  return (
                    <select
                      key={key}
                      value={form.image}
                      onChange={(e) =>
                        handleChange(idx, "image", e.target.value)
                      }
                      className="select-base"
                      style={{ backgroundColor: bgColor }}
                    >
                      {imageOptions.map((option) => (
                        <option
                          key={option.src}
                          value={option.src}
                          style={{ backgroundColor: option.color }}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  );
                }
                case "image":
                  return (
                    <div className="image-container" key={key}>
                      <img
                        src={form.image}
                        alt="Selected"
                        className="image-preview"
                      />
                    </div>
                  );
                case "evolution": {
                  const evoOptions =
                    form.rarity === "SSR"
                      ? evolutionOptionsSSR
                      : evolutionOptionsUR;
                  return (
                    <select
                      key={key}
                      value={form.evolution}
                      onChange={(e) =>
                        handleChange(idx, "evolution", e.target.value)
                      }
                      className="select-colored select-evolution"
                      style={{ backgroundColor: selectedEvolutionColor }}
                    >
                      {evoOptions.map((option) => (
                        <option
                          key={option.evolution}
                          value={option.evolution}
                          style={{ backgroundColor: option.color }}
                        >
                          {option.evolution}
                        </option>
                      ))}
                    </select>
                  );
                }
                case "number": {
                  const min = 1;
                  const max =
                    meta.field === "currentLevel"
                      ? form.rarity === "SSR"
                        ? levelCostsSSR.length
                        : levelCostsUR.length
                      : form.rarity === "SSR"
                      ? levelCostsSSR.length + 1
                      : levelCostsUR.length + 1;
                  return (
                    <input
                      type="number"
                      min={min}
                      max={max}
                      value={form[meta.field as keyof FormData]}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "")
                          return handleChange(
                            idx,
                            meta.field as keyof FormData,
                            ""
                          );
                        const num = Math.max(min, Math.min(max, parseInt(val)));
                        if (!isNaN(num))
                          handleChange(idx, meta.field as keyof FormData, num);
                      }}
                      className="input-number"
                      style={{ backgroundColor: bgColor }}
                      key={key}
                    />
                  );
                }
                case "cost":
                  return (
                    <div
                      key={key}
                      className="div-output"
                      style={{ backgroundColor: bgColor }}
                    >
                      {getCostBetweenLevels(
                        form.currentLevel,
                        form.maxLevel,
                        form.rarity
                      )}
                    </div>
                  );
                case "calculated": {
                  const health = getHealthAtLevelGeneralized(
                    form.maxLevel,
                    form.evolution
                  );
                  let multiplier = 1;
                  if (meta.field === "statsTotal") {
                    multiplier =
                      form.rarity === "SSR"
                        ? statsMultiplierSSR
                        : statsMultiplierUR;
                  } else if (meta.field === "element") {
                    multiplier = form.rarity === "SSR" ? 2 : 1.5;
                  }
                  const value = health * multiplier;
                  return (
                    <div
                      key={key}
                      className="div-output"
                      style={{ backgroundColor: bgColor }}
                    >
                      {value}
                    </div>
                  );
                }
                case "efficiency": {
                  const efficiency = calculateEfficiency(
                    form.currentLevel,
                    form.maxLevel,
                    form.evolution,
                    form.rarity
                  );
                  return (
                    <div
                      key={key}
                      className="div-output"
                      style={{ backgroundColor: bgColor }}
                    >
                      {efficiency.toFixed(3)}%
                    </div>
                  );
                }
                case "statsGained": {
                  const multiplier =
                    form.rarity === "SSR"
                      ? statsMultiplierSSR
                      : statsMultiplierUR;
                  const statsAtCurrent =
                    getHealthAtLevelGeneralized(
                      form.currentLevel,
                      form.evolution
                    ) * multiplier;
                  const statsAtMax =
                    getHealthAtLevelGeneralized(form.maxLevel, form.evolution) *
                    multiplier;
                  const gain = statsAtMax - statsAtCurrent;
                  return (
                    <div
                      key={key}
                      className="div-output"
                      style={{ backgroundColor: bgColor }}
                    >
                      {gain}
                    </div>
                  );
                }
                default:
                  return null;
              }
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="app-container">
        <div className="main-content">
          <h1 className="title">CREATURE LEVELING SIMULATOR</h1>

          <div className="input-row">
            <div className="label-input-group">
              <label htmlFor="creatureCount" className="creature-count-label">
                Number of Creatures:
              </label>
              <input
                type="number"
                id="creatureCount"
                value={numberOfCreatures}
                min="1"
                max="6"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setNumberOfCreatures(""); // allow clearing
                  } else {
                    const parsed = parseInt(val, 10);
                    if (!isNaN(parsed) && parsed >= 1 && parsed <= 12) {
                      setNumberOfCreatures(parsed);
                    }
                  }
                }}
                placeholder="No. Creatures"
                className="creature-count-input"
              />
            </div>
          </div>

          <div className="creature-food">
            <div className="creature-food-label-input">
              <label htmlFor="totalResource" className="food-label">
                Creature food:
              </label>
              <input
                type="number"
                id="totalResource"
                value={totalResourceInput}
                onChange={handleResourceInputChange}
                placeholder="Total Resource"
                className="food-input"
              />
            </div>
            <div className="buttons-container">
              <button onClick={updateResource} className="update-button">
                Update Food
              </button>
              <button onClick={runLevelingSimulation} className="run-button">
                Run Simulation
              </button>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="table-text">Rarity</th>
                  <th className="table-text">Selected Creature</th>
                  <th className="table-text">Selected Evolution</th>
                  <th className="table-text">Current Level</th>
                  <th className="table-text">Estimated Level</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form, index) => {
                  const bgColor =
                    form.rarity === "SSR"
                      ? imageOptionsSSR.find((opt) => opt.src === form.image)
                          ?.color || "white"
                      : imageOptionsUR.find((opt) => opt.src === form.image)
                          ?.color || "white";
                  const selectedEvolutionColor =
                    form.rarity === "SSR"
                      ? evolutionOptionsSSR.find(
                          (opt) => opt.evolution === form.evolution
                        )?.color || "white"
                      : evolutionOptionsUR.find(
                          (opt) => opt.evolution === form.evolution
                        )?.color || "white";
                  const filteredOptions =
                    form.rarity === "SSR"
                      ? evolutionOptionsSSR
                      : evolutionOptionsUR;
                  return (
                    <tr key={index}>
                      <td className="table-text">
                        <select
                          value={form.rarity}
                          onChange={(e) => {
                            const newRarity = e.target.value as "SSR" | "UR";
                            const defaultData =
                              newRarity === "SSR"
                                ? defaultSSRFormData
                                : defaultURFormData;

                            updateForm(index, {
                              ...forms[index],
                              rarity: newRarity,
                              image: defaultData.image,
                              evolution: defaultData.evolution,
                              currentLevel: defaultData.currentLevel,
                              maxLevel: defaultData.maxLevel,
                            });
                          }}
                          className="rarity-select"
                          style={{
                            backgroundColor:
                              form.rarity === "SSR" ? "yellow" : "#40E0D0",
                          }}
                        >
                          <option
                            value="SSR"
                            style={{
                              backgroundColor: "yellow",
                              fontWeight: 700,
                            }}
                          >
                            SSR
                          </option>
                          <option
                            value="UR"
                            style={{
                              backgroundColor: "#40E0D0",
                              fontWeight: 700,
                            }}
                          >
                            UR
                          </option>
                        </select>
                      </td>

                      <td className="table-text">
                        <select
                          value={form.image}
                          onChange={(e) =>
                            handleChange(index, "image", e.target.value)
                          }
                          className="image-select"
                          style={{ backgroundColor: bgColor }}
                        >
                          {form.rarity === "SSR" &&
                            imageOptionsSSR.map((option) => (
                              <option
                                key={option.src}
                                value={option.src}
                                style={{ backgroundColor: option.color }}
                              >
                                {option.label}
                              </option>
                            ))}
                          {form.rarity === "UR" &&
                            imageOptionsUR.map((option) => (
                              <option
                                key={option.src}
                                value={option.src}
                                style={{ backgroundColor: option.color }}
                              >
                                {option.label}
                              </option>
                            ))}
                        </select>
                      </td>

                      <td className="table-text">
                        <select
                          value={form.evolution}
                          onChange={(e) =>
                            handleChange(index, "evolution", e.target.value)
                          }
                          className="evolution-select"
                          style={{ backgroundColor: selectedEvolutionColor }}
                        >
                          {filteredOptions.map((option) => (
                            <option
                              key={option.evolution}
                              value={option.evolution}
                              style={{ backgroundColor: option.color }}
                            >
                              {option.evolution}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="table-text">
                        <input
                          type="number"
                          value={form.currentLevel}
                          min={1}
                          max={
                            form.rarity === "SSR"
                              ? levelCostsSSR.length
                              : levelCostsUR.length
                          }
                          onChange={(e) => {
                            const rawValue = e.target.value;
                            if (rawValue === "") {
                              handleChange(index, "currentLevel", "");
                              return;
                            }
                            const parsed = Number(rawValue);
                            if (!isNaN(parsed)) {
                              const clamped = Math.min(
                                Math.max(parsed, 1),
                                form.rarity === "SSR"
                                  ? levelCostsSSR.length
                                  : levelCostsUR.length
                              );
                              handleChange(index, "currentLevel", clamped);
                            }
                          }}
                          className="level-input"
                        />
                      </td>

                      <td className="table-text">
                        {finalLevels ? finalLevels[index] : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sidebar">
          <section className="sidebar-section">
            <h2 className="sidebar-title">HOW TO USE THE SIMULATOR ?</h2>
            <ol className="sidebar-list">
              <li>Select your number of creatures.</li>
              <li>Select your creatures.</li>
              <li>Select an evolution for each creature.</li>
              <li>Enter the current level for each creature.</li>
              <li>Enter your specific food value.</li>
              <li>Click on the Update Food button.</li>
              <li>Click on the Run Simulation button.</li>
            </ol>
            <ul className="sidebar-list-green">
              <li>
                The two calculators are linked, so the selections made in one
                directly influence the selections in the other one.
              </li>
            </ul>
            <ul className="sidebar-list-yellow">
              <li>
                Special thanks to Zohix for helping me gather the necessary
                data.
              </li>
            </ul>
          </section>

          {finalLevels && (
            <div className="simulation-results">
              <span className="simulation-results-title">
                Simulation Results:
              </span>
              <ul className="simulation-results-list">
                <li>Creature Food: {totalResource}</li>
                <li>Remaining Food After Leveling: {remainingResource}</li>
                <li>
                  Total Stats at Current Level (All Combined):{" "}
                  {initialTotalStatsSum}
                </li>
                <li className="red-text">
                  Total Stats at Estimated Level (All Combined):{" "}
                  {finalTotalStatsSum}
                </li>
                <li className="gold-text">
                  Total Stats Gained (All Combined):{" "}
                  {finalTotalStatsSum - initialTotalStatsSum}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          color: "white",
          padding: "16px",
        }}
      >
        <h2
          style={{
            color: "green",
          }}
        >
          ⚔️ Join KNIGHTSXORDER – Trakan US Server! ⚔️
        </h2>
        <p>We’re an active, supportive guild looking for committed players!</p>
        <ul>
          <li>✅ Daily Attendance</li>
          <li>✅ Guild Missions & Conquest</li>
          <li>
            💪 Recommended Awakening: <strong>S+</strong>
          </li>
          <li>🕒 Inactivity = Kick (6 days with Discord, 3 days no Discord)</li>
        </ul>
        <p>
          Join us, contribute, grow stronger—and enjoy the game with a great
          team!
        </p>
        <p
          style={{
            color: "yellow",
          }}
        >
          <strong>Search "KNIGHTSXORDER" in-game to apply!</strong>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <iframe
          width={500}
          height={300}
          className="youtube-frame"
          src="https://www.youtube.com/embed/-w2_Gwc_1gk?si=gAAzGG0nwZdPjl4v"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

function calculateEfficiency(
  currentLevel: number,
  maxLevel: number,
  evolution: string,
  creatureType: "SSR" | "UR"
): number {
  const healthAtMaxLevel = getHealthAtLevelGeneralized(maxLevel, evolution);
  const healthAtCurrentLevel = getHealthAtLevelGeneralized(
    currentLevel,
    evolution
  );

  const costToReachMaxLevel = getCostBetweenLevels(
    currentLevel,
    maxLevel,
    creatureType
  );

  if (costToReachMaxLevel === 0) return 0; // Avoid division by zero
  return creatureType === "SSR"
    ? ((statsMultiplierSSR * (healthAtMaxLevel - healthAtCurrentLevel)) /
        costToReachMaxLevel) *
        100
    : ((statsMultiplierUR * (healthAtMaxLevel - healthAtCurrentLevel)) /
        costToReachMaxLevel) *
        100;
}

function getCostBetweenLevels(
  currentLevel: number,
  maxLevel: number,
  creatureType: "SSR" | "UR"
): number {
  const costArray = creatureType === "SSR" ? levelCostsSSR : levelCostsUR;

  if (currentLevel >= maxLevel) return 0;

  let costToReach = 0;
  for (let level = currentLevel; level < maxLevel; level++) {
    const index = level - 1;
    if (index >= 0 && index < costArray.length) {
      costToReach += costArray[index];
    }
  }

  return costToReach;
}

function getCostAtLevel(level: number, creatureType: "SSR" | "UR"): number {
  const costArray = creatureType === "SSR" ? levelCostsSSR : levelCostsUR;
  if (level < 2 || level > costArray.length + 1) return 0;
  return costArray[level - 2]; // Adjusted for 1-based level indexing
}

function getHealthAtLevelGeneralized(level: number, evolution: string): number {
  if (level <= 0) {
    return 0;
  }

  let initialHealth = 0;
  let increments: number[] = [];
  let patternLength: number;

  switch (evolution) {
    case "SSR Unique":
      initialHealth = 50;
      increments = [5, 5, 4, 5, 6];
      patternLength = 5;
      break;
    case "SSR Unique+1":
      initialHealth = 55;
      increments = [5, 6, 5, 6, 5, 6];
      patternLength = 6;
      break;
    case "SSR Unique+2":
      initialHealth = 60;
      increments = [6, 6, 6, 6, 6, 6];
      patternLength = 6;
      break;
    case "SSR Epic":
      initialHealth = 75;
      increments = [7, 8, 7, 7, 8, 8];
      patternLength = 6;
      break;
    case "SSR Epic+1":
      initialHealth = 80;
      increments = [8, 8, 7, 8, 9, 8, 8, 7, 9, 8];
      patternLength = 10;
      break;
    case "SSR Epic+2":
      initialHealth = 85;
      increments = [8, 9, 8, 9, 8, 9, 8, 9];
      patternLength = 8;
      break;
    case "SSR Epic+3":
      initialHealth = 89;
      increments = [9, 10, 8, 9, 9, 9, 10, 8, 9, 9];
      patternLength = 10;
      break;
    case "SSR Legendary":
      initialHealth = 100;
      increments = [10, 10, 9, 10, 11, 10, 10, 9, 11, 10];
      patternLength = 10;
      break;
    case "SSR Legendary+1":
      initialHealth = 110;
      increments = [11, 11, 10, 12, 11, 11, 11, 11, 12, 11];
      patternLength = 10;
      break;
    case "SSR Legendary+2":
      initialHealth = 120;
      increments = [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12];
      patternLength = 11;
      break;
    case "SSR Legendary+3":
      initialHealth = 129;
      increments = [13, 14, 12, 13, 13, 13, 13, 13, 14, 12, 13, 13];
      patternLength = 12;
      break;
    case "SSR Legendary+4":
      initialHealth = 139;
      increments = [15, 14, 13, 14, 15, 14, 14, 13, 15, 14, 14, 15];
      patternLength = 12;
      break;
    case "SSR Mythic":
      initialHealth = 150;
      increments = [15, 15, 14, 15, 16];
      patternLength = 5;
      break;
    case "UR Unique":
      initialHealth = 2000;
      increments = [200];
      patternLength = 1;
      break;
    case "UR Unique+1":
      initialHealth = 2099;
      increments = [210];
      patternLength = 1;
      break;
    case "UR Unique+2":
      initialHealth = 2200;
      increments = [220];
      patternLength = 1;
      break;
    case "UR Epic":
      initialHealth = 2400;
      increments = [240];
      patternLength = 1;
      break;
    // case "UR Epic+1":
    //   initialHealth = 3080;
    //   increments = [240];
    //   patternLength = 1;
    //   break;
    // case "UR Epic+2":
    //   initialHealth = 2600;
    //   increments = [260];
    //   patternLength = 1;
    //   break;
    // case "UR Epic+3":
    //   initialHealth = 2700;
    //   increments = [270];
    //   patternLength = 1;
    //   break;
    // case "UR Legendary":
    //   initialHealth = 8409;
    //   increments = [260];
    //   patternLength = 1;
    //   break;
    //   //difference in stats is 9.09%
    // case "UR Legendary+1":
    //   initialHealth = 10899;
    //   increments = [260];
    //   patternLength = 1;
    //   break;
    default:
      return 0;
  }

  let currentHealth = initialHealth;
  let incrementIndex = 0;

  for (let i = 2; i <= level; i++) {
    currentHealth += increments[incrementIndex] || 0;
    incrementIndex = (incrementIndex + 1) % patternLength;
  }

  return currentHealth;
}
