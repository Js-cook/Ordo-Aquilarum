import random
from api.models import Question

def generate_adj(declension):
  items = []
  final = []
  tris = {
    # Covers nom, gen for masc fem
    "tristis": ["bonus", "bona", "boni", "bonae"],
    # covers nom and acc for neu
    "triste": ["bonum"],
    # dat and abl for all
    "tristi": ["bono", "bonae", "bonā"],
    # covers acc for masc fem
    "tristem": ["bonum", "bonam"],
    # covers nom and acc for masc and fem
    "tristes": ["boni", "bonae", "bonos", "bonas"],
    # covers nom and acc for neu
    "tristia": ["bona"],
    # covers gen for masc, neu, fem
    "tristium": ["bonorum", "bonarum"],
    # covers dat and abl for masc, neu, fem
    "tristibus": ["bonis"]
  }
  bon = {
    "bonus": ["tristis"],
    "bona": ["tristis", "tristia"],
    "bonum": ["triste", "tristem"],
    "boni": ["tristis", "tristes"],
    "bonae": ["tristis", "tristi", "tristes"],
    "bono": ["tristi"],
    "bonam": ["tristem"],
    "bonā": ["tristi"],
    "bonorum": ["tristium"],
    "bonarum": ["tristium"],
    "bonis": ["tristibus"],
    "bonas": ["tristes"],
    "bonos": ["tristes"]
  }

  if declension == "all":
    # for question in Question.objects.all():
      # items.append(question)
    query = Question.objects.all()
    items = list(query.values())
  else:
    query = Question.objects.filter(declension=f" {declension} ")
    items = list(query.values())

  selection = random.choice(items)
  
  # filtering items
  items.remove(selection)
  for r_item in items:
    selected_split = selection['term'].split(" ")
    if "tris" in selected_split[-1]:
      hashed = tris[selected_split[-1]]
    else:
      hashed = bon[selected_split[-1]]
      
    r_split = r_item['term'].split(" ")
    
    # If the terms are the same
    if r_item['term'] == selection['term']:
      items.remove(r_item)
    
    # If the first of term is the same (prevents dupes with different adj)  
    if r_split[0] == selected_split[0]:
      if r_item in items:
        items.remove(r_item)

    if r_split[-1] == selected_split[-1]:
      if r_item in items:
        items.remove(r_item)

    if r_split[-1] in hashed:
      if r_item in items:
        items.remove(r_item)

    if r_item['gender'] == selection['gender']:
      if r_item in items:
        items.remove(r_item)
  
  first_incor = random.choice(items)
  items.remove(first_incor)
  
  second_incor = random.choice(items)
  items.remove(second_incor)

  final.append(selection)
  final.append(first_incor)
  final.append(second_incor)
  
  return final
