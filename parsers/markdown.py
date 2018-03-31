
# Markdown -> JSON

"""
{
    author
    name
    deck_id
    modified
    order
    cards [
        {
            type
            id
            fields
        }
    ]
}
"""

import json, sys, os

def mk_card(id, fields, type="TwoCard"):
    return {"id":id, "fields":fields, "type":type}

def mk_two_card(id, front, back):
    return {"id":id, "fields":{"front":front, "back":back}, "type":"TwoCard"}

def parse(src, name, id, author):
    cards = []

    """
        TODO
        PARSE / ETC.
    """

    # test
    cards += mk_two_card(id=len(cards), "1+1 is", "2")
    cards += mk_two_card(id=len(cards), "3+3 is", "6")

    return json.dumps({"author":author, "name":name, "deck_id":id, "modified":now,
            "order":order, "cards":cards})



if __name__=="__main__":

    if sys.argv[1] == '-':
        ' Read from stdin '
        src = sys.stdin.readlines()
        sys.stdout.write(parse(src))

    else:
        ' Read a file '
        with open(sys.argv[1], 'r') as f:
            src = f.readlines()
            sys.stdout.write(parse(src))

