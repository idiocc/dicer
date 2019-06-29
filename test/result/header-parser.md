## No header

/* expected */
{}
/**/

## Value spacing
Content-Type:   text/plain
Content-Length: 0

/* expected */
{
  'content-type': ['  text/plain'],
  'content-length': ['0'],
}
/**/

## Folded values
Content-Type:
 text/plain
Foo:
 bar
 baz

/* expected */
{
  'content-type': [' text/plain'],
  'foo': [' bar baz'],
}
/**/

## Empty values
Content-Type:
Foo:

/* expected */
{
  'content-type': [''],
  'foo': [''],
}
/**/

## Max header size (single chunk)
MAXED_BUFFER

/* expected */
{}
/**/

## Max header size (multiple chunks #1)
ABCDEFGHIJ
MAXED_BUFFER

/* expected */
{}
/**/

## Max header size (multiple chunk #2)
MAXED_BUFFER
MAXED_BUFFER

/* expected */
{}
/**/