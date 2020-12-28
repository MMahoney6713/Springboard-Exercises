def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

        >>> same_frequency(551122, 221515)
        True

        >>> same_frequency(321142, 3212215)
        False

        >>> same_frequency(1212, 2211)
        True
    """

    num1_str = str(num1)
    num2_str = str(num2)
    num1_freqs = {num: num1_str.count(num) for num in num1_str}
    num2_freqs = {num: num2_str.count(num) for num in num2_str}

    return num1_freqs == num2_freqs

# I liked the springboard solution, so I am making note of it here:
# def freq_counter(coll):
#     """Returns frequency counter mapping of coll."""

#     counts = {}

#     for x in coll:
#         counts[x] = counts.get(x, 0) + 1

#     return counts
