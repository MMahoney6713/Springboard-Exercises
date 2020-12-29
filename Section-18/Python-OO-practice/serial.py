"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        """Make a new serial generator, beginning with the provided start value"""

        self.initial_value = start
        self.next_value = start

    def __repr__(self):
        """Show representation."""

        return f"<SerialGenerator start={self.initial_value} next={self.next_value}>"

    def generate(self):
        """Return the next value of the generator"""

        return_value = self.next_value
        self.next_value += 1
        return return_value

    def reset(self):
        """Resets the generator back to the original start value"""

        self.next_value = self.initial_value
