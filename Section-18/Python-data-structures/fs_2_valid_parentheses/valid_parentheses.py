def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """

    index_set = set()

    if parens[0] == ')' or len(parens) % 2 == 1:
        return False

    for i in range(len(parens)):
        if i in index_set:
            break
        counter = 1
        for j in range(i + 1, len(parens)):
            if parens[j] == ')':
                counter -= 1
            else:
                counter += 1
            if counter == 0:
                index_set.add(i)
                index_set.add(j)
                break
        if counter != 0:
            return False
    return True

    # I realized that the springboard solution was much simpler, so copying here - I was
    # on the right track at least!

    # count = 0

    # for p in parens:
    #     if p == '(':
    #         count += 1
    #     elif p == ')':
    #         count -= 1

    #     # fast fail: too many right parens
    #     if count < 0:
    #         return False

    # return count == 0
