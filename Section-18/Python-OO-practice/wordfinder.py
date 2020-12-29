from random import randint


class WordFinder:
    """Word Finder: finds random words from a dictionary."""

    def __init__(self, file_path):
        """Initialize the WordFinder by reading from the provided words file and reporting the number of items read"""

        self.words = self.return_words_from_file(file_path)
        self.num_words = len(self.words)
        print(f"{self.num_words} words read")

    def return_words_from_file(self, file_path):
        """Reads through the provided file and returns a list of the words in the file"""

        with open(file_path) as file:
            words_list = [line.strip() for line in file]
        return words_list

    def random(self):
        """Returns a random word from the list of words from the file"""

        return self.words[randint(0, self.num_words - 1)]


newWordFinder = WordFinder('words.txt')
print(newWordFinder.random())


class SpecialWordFinder(WordFinder):
    """Extends WordFinder to accept documents with blank lines and '#' symbols"""

    def return_words_from_file(self, file_path):
        """ Reads through provided file and returns a list of the words in the file"""

        with open(file_path) as file:
            words_list = [line.strip()
                          for line in file if line.strip() and line[0] != '#']
        return words_list
