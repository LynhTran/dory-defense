from pymongo import MongoClient

mongo_url = ''
client = MongoClient(mongo_url)
db = client.backend

def get_blocklist_domain_hashes():
    data = db.blocklist.find({})
    blocklist_hashed = []
    for entry in data:
        blocklist_hashed.append(entry['_id'])
    return blocklist_hashed

def add_blocklist_domain_hash(domain, domain_hash):
    if not db.forts.find_one({'_id': domain_hash}):
        data = {
            '_id': domain_hash,
            'domain': domain
        }
        db.blocklist.insert_one(data)