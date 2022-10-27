function TrieNode(char){
    this.char = char;
    this.parent = null;
    this.children = {};
    this.isEnd = false;
}

TrieNode.prototype.getWord = function(){
    let output = [];
    let node = this;

    while(node !== null){
        output.unshift(node.char);
        node = node.parent;
    }

    return output.join('');
}

function Trie(){
    this.root = new TrieNode(null);
}

Trie.prototype.insert = function(word){
    let node = this.root;

    for(let char of word){
        if(!node.children[char]){
            node.children[char] = new TrieNode(char);
            node.children[char].parent = node;
        }

        node = node.children[char];
    }

    node.isEnd = true;
}

Trie.prototype.search = function(word){
    let node = this.root;

    for(let char of word){
        if(node.children[char]){
            node = node.children[char];
        }
        else{
            return false;
        }
    }

    return node.isEnd;
}

Trie.prototype.suggest = function(prefix){
    let node = this.root;
    let output = [];
    
    for(let char of prefix){
        if(node.children[char]){
            node = node.children[char];
        }
        else{
            return output;
        }
    }

    findAllSuggestions(node, output);

    return output;
}

function findAllSuggestions(node, output){
    if(node.isEnd){
        output.unshift(node.getWord());
    }

    for(let child in node.children){
        findAllSuggestions(node.children[child], output);
    }
}