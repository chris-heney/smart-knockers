# Smart Knockers

Sorting addresses can be a real pain in the ass, especially when you're trying to organize them in the most logical way for something as simple (but crucial!) as walking routes. We've all been there: the frustration of addresses ordered alphabetically instead of numerically, phases mixed up, and streets out of order. But not anymore!

With this **Address Sorting Assistant**, you can finally sort your address lists **intelligently** — by phase, street name, and house number — just like you’d expect a smart system to do. Whether you're using TypeScript or Python, this application has you covered, so you can focus on the important things, like planning the most efficient route for deliveries, inspections, or door-to-door campaigns.

Let’s make those **long, tedious walks** smarter, faster, and just a little more enjoyable!

**Smart Knockers** was inspired by Lindsay Roland and her fellow troops performing Lead Service Line Inventory across the nation to make drinking water safer for all Americans as part of the _Get the Lead Out Initiative_ - a joint task initiative executed by General Dynamics, Skeo Solutions, and other Environmental Consulting companies.

## Features

- **Sort by phase first**: Because we all know things need to be done in order.
- **Group by street name**: Avoid the headache of jumping back and forth between streets.
- **Order by house number**: No more houses listed as 1000 before 5!
- **Compatible with both TypeScript and Python**: Choose whichever suits you best.

## Requirements

### TypeScript Version

- Node.js (v12 or higher)
- `pnpm` (preferred) or `npm`
- TypeScript

### Python Version

- Python 3.7+
- `pandas` package

## Installation and Usage

### TypeScript

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd address-ordering-by-phase
   ```

2. **Install dependencies with pnpm:**

   ```bash
   pnpm install
   ```

3. **Run the script with TypeScript:**

   ```bash
   pnpx ts-node convert.ts
   ```

   - Place your unsorted CSV files in the `./input` directory.
   - The sorted files will be output in the `./output` directory.

4. **Directory Structure:**

   ```
   .
   ├── input/   # Place your CSV files here
   ├── output/  # Sorted files will be placed here
   ├── convert.ts   # The TypeScript script
   └── tsconfig.json  # TypeScript configuration
   ```

### Python

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd address-ordering-by-phase
   ```

2. **Install dependencies:**

   If you haven't already, set up a Python environment and install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Python script:**

   ```bash
   python convert.py
   ```

   - Place your unsorted CSV files in the `./input` directory.
   - The sorted files will be output in the `./output` directory.

4. **Directory Structure:**

   ```
   .
   ├── input/   # Place your CSV files here
   ├── output/  # Sorted files will be placed here
   ├── convert.py   # The Python script
   └── requirements.txt  # Python dependencies
   ```

## How It Works

This assistant takes CSV files containing addresses in the following format:

| Address        | Phase     |
|----------------|-----------|
| 123 Main St    | Phase 4   |
| 42 Oak St      | Phase 5   |
| 1282 Elm St    | Phase 5   |

It then sorts the records in the following priority:
1. **Phase** – ensuring things are done in logical order.
2. **Street Name** – grouping addresses on the same street together.
3. **House Number** – ordering house numbers **numerically**, not alphabetically (finally!).

### Address Sorting Logic

- **Phase**: The phases are compared and sorted in order (e.g., "Phase 4" comes before "Phase 5").
- **Street Name**: Street names are extracted by removing the house numbers from the addresses, ensuring logical alphabetical grouping.
- **House Number**: Finally, house numbers are extracted and sorted numerically, meaning `5 Elm St` comes before `1282 Elm St`.

## Why You'll Love It

- **No more frustrating Excel sorting quirks**.
- **Spend less time wrestling with your data**, and more time doing the things that matter — like walking your routes without any unnecessary detours.
- **Both TypeScript and Python** versions available — use the language you’re most comfortable with!

---

**Happy sorting and smoother walks ahead!**

