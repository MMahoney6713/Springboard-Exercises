def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}

        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """

    frequency_map = {}
    for char in phrase.lower():
        if char in 'aeiou':
            if char in frequency_map:
                frequency_map[char] += 1
            else:
                frequency_map[char] = 1
    return frequency_map
