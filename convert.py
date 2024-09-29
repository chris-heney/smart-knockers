import os
import pandas as pd
import re

# Extract the street name from the address (remove house number)
def extract_street_name(address: str):
    match = re.match(r'^\d+\s+(.*)', address)
    return match.group(1) if match else address

# Extract the house number (leading number) from the address
def extract_house_number(address: str):
    match = re.match(r'^(\d+)', address)
    return int(match.group(0)) if match else 0

# Sort the DataFrame first by 'Phase', then by 'Street Name', and finally by 'House Number'
def sort_dataframe(df):
    df['StreetName'] = df['address'].apply(extract_street_name)
    df['HouseNumber'] = df['address'].apply(extract_house_number)
    df_sorted = df.sort_values(by=['phase', 'StreetName', 'HouseNumber'], ascending=[True, True, True])
    df_sorted = df_sorted.drop(columns=['StreetName', 'HouseNumber'])  # Drop the helper columns
    return df_sorted

# Process a single CSV file
def process_csv(input_file, output_file):
    # Read CSV into a DataFrame
    df = pd.read_csv(input_file)

    # Sort the DataFrame
    df_sorted = sort_dataframe(df)

    # Save the sorted DataFrame to the output file
    df_sorted.to_csv(output_file, index=False)
    print(f"Processed and saved: {output_file}")

# Main function to process all CSV files in the input directory
def process_all_csv_files():
    input_dir = './input'
    output_dir = './output'

    # Ensure output directory exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Process each CSV file in the input directory
    for filename in os.listdir(input_dir):
        if filename.endswith('.csv'):
            input_file = os.path.join(input_dir, filename)
            output_file = os.path.join(output_dir, filename)
            process_csv(input_file, output_file)

if __name__ == "__main__":
    process_all_csv_files()
