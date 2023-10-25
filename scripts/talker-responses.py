# Neat lil script that goes through all talker scripts in a directory and extracts all player voice lines / responses to a JSON format.

import os
import json

# These tell us to which survivor each line belongs to.
playerNames = [
  #l4d1
  "TeenGirl", "NamVet", "Biker", "Manager",
  #l4d2
  "Coach", "Mechanic", "Gambler", "Producer"
]

scriptsPath = "./l4d2_scripts"
filesToCheck = []

# Walk through the scripts folder and get all the files that are present within the "talker" directory
for root, dirs, files in os.walk(scriptsPath):
  for file in files:
    if file.endswith(".txt"):
      if "talker" in root:
        fullPath = os.path.join(root, file)
        print("Found file: " + fullPath)
        filesToCheck.append(fullPath)

        # Convert to utf-8 because some files got weird characters
        # Not my finest work but it does the job
        f = open(fullPath, "rb")
        content = f.read().decode("ISO-8859-1", "ignore")
        f.close()

        f = open(fullPath, "w", encoding="utf-8")
        f.write(content)
        f.close()

results = []

resultsJson = {
  "Coach": {},
  "Mechanic": {},
  "Gambler": {},
  "Producer": {},
  "TeenGirl": {},
  "NamVet": {},
  "Manager": {},
  "Biker": {},
}

for file in filesToCheck:
  # Open the file and read all the lines.
  try:
    f = open(file, "r")
    lines = f.readlines()
    f.close()
  except:
    print("Error reading file: " + file)
    continue

  isInResponseBlock = False
  currentResponseBlockName = ""

  results.append("-------------------------------------------------------\n  " + file + "\n-------------------------------------------------------\n\n")

  # Loop through each line.
  for _line in lines:
    line = _line.strip().lower()
 
    if isInResponseBlock:
      if "scene" in line and "//" in line:
     
        # Get the scene player
        scenePlayer = ""

        for playerName in playerNames:
          if ("scenes/" + playerName.lower()) in line:
            scenePlayer = playerName
            break

        # Not a survivor line, skip it.
        if scenePlayer == "":
          continue

        # Explode the line to get the scene subtitles
        lineParts = _line.split("//")
        sceneSubtitles = lineParts[1].strip()

        # Store the scene data
        sceneResults = []
        sceneResults.append("RESPONSE " + currentResponseBlockName + " ")
        sceneResults.append("CHARACTER " + scenePlayer + " SUBTITLE " + sceneSubtitles + "\n" )
        results.extend(sceneResults)

        #Skip empty subtitles
        if sceneSubtitles == "":
          continue

        alreadyPresentKey = resultsJson[scenePlayer].get(currentResponseBlockName)
        if alreadyPresentKey == None:
          resultsJson[scenePlayer][currentResponseBlockName] = [sceneSubtitles]
        else:
          isAlreadyIncluded = sceneSubtitles in resultsJson[scenePlayer][currentResponseBlockName]
          if not isAlreadyIncluded:
            resultsJson[scenePlayer][currentResponseBlockName].append(sceneSubtitles)

        continue
      
      # Reset the current response block data
      if "}" in line:
        isInResponseBlock = False
        currentResponseBlockName = ""
        continue

    # We are entering a response block
    if line.startswith("response"):
      isInResponseBlock = True
      currentResponseBlockName = _line.split(" ")[1].strip()
      continue
  
  results.append("\n\n\n")
  
# Write the results to a file.
f = open("vocalizer-responses.txt", "w")
f.writelines(results)
f.close()

json_data = json.dumps(resultsJson, indent=2)
with open('vocalizer-responses.json', 'w') as outfile:
  outfile.write(json_data)
  outfile.close()

print("Done!")
