## One nested multipart
nested

/* opts */
{ boundary: 'AaB03x' }
/**/

/* nparts */
2
/**/

## Many parts
many

/* opts */
{ boundary: '----WebKitFormBoundaryWLHCs9qmcJJoyjKR' }
/**/

/* nparts */
7
/**/

## Many parts, wrong boundary
many-wrongboundary

/* opts */
{ boundary: 'LOLOLOL' }
/**/

/* dicerError */
Unexpected end of multipart data
/**/

/* nparts */
0
/**/

## Many parts, end boundary missing, 1 file open
many-noend

/* opts */
{ boundary: '----WebKitFormBoundaryWLHCs9qmcJJoyjKR' }
/**/

/* dicerError */
Unexpected end of multipart data
/**/
/* nparts */
7
/**/
/* npartErrors */
1
/**/

## One nested multipart with preceding header
nested-full

/* opts */
{ boundary: 'AaB03x', headerFirst: true }
/**/
/* nparts */
2
/**/

## One nested multipart with preceding header, using setBoundary
nested-full

/* opts */
{ headerFirst: true }
/**/
/* setBoundary */
AaB03x
/**/
/* nparts */
2
/**/