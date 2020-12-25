
def print_upper_words(words_list, must_start_with):
    """Prints the all-caps versions of each string contained in words_list, filtered by 
    the words which begin with a letter contained in the must_start_with set"""

    for word in words_list:
        if word[0] in must_start_with:
            print(word.upper())


print_upper_words(['hello', 'hey', 'goodbye', 'yo', 'yes'],
                  must_start_with={"h", "y"})
